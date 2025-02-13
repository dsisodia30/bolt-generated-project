import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { Employee } from './Employee'
import { ExtendedBaseEntity } from './BaseEntity'

    @Entity()
    export class Attendance extends ExtendedBaseEntity {

      @Column()
      employeeId!: number

      @Column({ type: 'date' })
      date!: Date

      @Column({ type: 'time' })
      checkIn!: Date

      @Column({ type: 'time' })
      checkOut!: Date

      @Column()
      status!: string

      @ManyToOne(() => Employee, (employee: Employee) => employee.attendance)
      employee!: Employee
    }
