import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'
    import { Role } from './Role'

    @Entity()
    export class Permission extends BaseEntity {
      @PrimaryGeneratedColumn()
      id: number

      @Column()
      name: string

      @Column()
      type: string

      @Column()
      value: string

      @ManyToOne(() => Role, role => role.permissions)
      role: Role
    }
