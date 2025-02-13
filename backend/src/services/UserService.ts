import { BaseService } from './BaseService'
import { UserRepository } from '../repositories/UserRepository'
import { User } from '../entities/User' // Import User entity


    export class UserService extends BaseService<User> {
      constructor() {
        super(new UserRepository());
      }

      async findByUsername(username: string): Promise<User | undefined> {
        return this.repository.findByUsername(username);
      }

      async findByEmail(email: string): Promise<User | undefined> {
        return this.repository.findByEmail(email);
      }
    }
