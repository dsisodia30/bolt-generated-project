import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
    import { Employee } from './Employee'
import { ExtendedBaseEntity } from './BaseEntity'

    @Entity()
    export class Job extends ExtendedBaseEntity {
      @PrimaryGeneratedColumn()
      id!: number

      @Column()
      employeeId!: number

      @ManyToOne(() => Employee, employee => employee.jobs)
      employee!: Employee

      @Column()
      jobId!: string

      @Column()
      jobTitle!: string

      @Column()
      department!: string

      @Column()
      location!: string

      @Column()
      startDate!: Date

      @Column()
      endDate!: Date

      @Column()
      status!: string

      @Column()
      reason!: string
    }
