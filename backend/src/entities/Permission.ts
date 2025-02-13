import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from 'typeorm'
    import { Role } from './Role'
import { ExtendedBaseEntity } from './BaseEntity'

    @Entity()
    export class Permission extends ExtendedBaseEntity {
      @PrimaryGeneratedColumn()
      id!: number

      @Column()
      name!: string

      @Column()
      type!: string

      @Column()
      value!: string

      @ManyToOne(() => Role, role => role.permissions)
      role!: Role
    }
