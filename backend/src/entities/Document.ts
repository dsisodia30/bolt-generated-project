import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { Employee } from './Employee'
import { ExtendedBaseEntity } from './BaseEntity'

    @Entity()
    export class Document extends ExtendedBaseEntity {
      @PrimaryGeneratedColumn()
      id!: number

      @Column()
      name!: string

      @Column()
      type!: string

      @Column()
      url!: string

      @Column()
      employeeId!: number

      @ManyToOne(() => Employee, employee => employee.documents)
      employee!: Employee
    }
