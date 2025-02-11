import { UserRepository } from '../repositories/UserRepository'
    import { RoleRepository } from '../repositories/RoleRepository'
    import { User } from '../entities/User'
    import { Role } from '../entities/Role'
    import { sign, verify } from 'jsonwebtoken'
    import bcrypt from 'bcryptjs'

    const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key'

    export class AuthService {
      private userRepository = new UserRepository()
      private roleRepository = new RoleRepository()

      async register(user: Partial<User>) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const newUser = await this.userRepository.create({
          ...user,
          password: hashedPassword,
          roles: ['USER']
        })

        // Assign default role
        const defaultRole = await this.roleRepository.findOne({ where: { name: 'USER' } })
        if (defaultRole) {
          newUser.roles = [defaultRole.name]
          await this.userRepository.update(newUser.id, newUser)
        }

        const token = this.generateToken(newUser)
        return { user: newUser, token }
      }

      async login(username: string, password: string) {
        const user = await this.userRepository.findByUsername(username)
        if (!user) throw new Error('Invalid credentials')

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) throw new Error('Invalid credentials')

        const token = this.generateToken(user)
        return { user, token }
      }

      generateToken(user: User) {
        return sign({ 
          userId: user.id, 
          username: user.username, 
          roles: user.roles 
        }, SECRET_KEY, {
          expiresIn: '1h'
        })
      }

      verifyToken(token: string) {
        return verify(token, SECRET_KEY)
      }

      async checkPermission(userId: number, permission: string) {
        const user = await this.userRepository.findOne(userId, {
          relations: ['role']
        })
        if (!user) return false

        const rolePermissions = await this.roleRepository.findOne(user.role.id, {
          relations: ['permissions']
        })

        return rolePermissions.permissions.some(
          p => p.value === permission
        )
      }
    }
