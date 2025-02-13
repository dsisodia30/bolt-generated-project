import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Tree, ManyToOne, OneToMany} from 'typeorm'
    import { User } from './User'
    import { Permission } from './Permission'
import { ExtendedBaseEntity } from './BaseEntity'

    @Entity()
    @Tree('materialized-path')
    export class Role extends ExtendedBaseEntity {
      @PrimaryGeneratedColumn()
      id!: number

      @Column()
      name!: string

      @Column()
      description!: string

      @Column()
      parentRole!: string

      @Column()
      path!: string

      @Column()
      depth!: number

      @ManyToOne(() => User, user => user.role)
      user!: User

      @OneToMany(() => Permission, permission => permission.role)
      permissions!: Permission[]
    }
