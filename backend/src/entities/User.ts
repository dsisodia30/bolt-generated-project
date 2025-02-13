import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from 'typeorm'
    import { Role } from './Role'
    import { Exclude } from 'class-transformer'
import { ExtendedBaseEntity } from './BaseEntity'

    @Entity()
    export class User extends ExtendedBaseEntity {
      @PrimaryGeneratedColumn()
      id!: number

      @Column({ unique: true })
      username!: string

      @Column({ unique: true })
      email!: string

      @Column()
      firstName!: string

      @Column()
      lastName!: string

      @Column()
      position!: string

      @Column({ type: 'date' })
      startDate!: Date

      @Column({ type: 'text', array: true })
      roles!: string[]

      @Exclude()
      @Column()
      password!: string

      @Column({ type: 'boolean' })
      enabled!: boolean

      @Column({ type: 'boolean' })
      accountNonExpired!: boolean

      @Column({ type: 'boolean' })
      credentialsNonExpired!: boolean

      @Column({ type: 'boolean' })
      accountNonLocked!: boolean

      @OneToMany(() => Role, role => role.user)
      role!: Role[]
      
      employees: any
    }
