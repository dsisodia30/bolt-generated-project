import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

    @Entity()
    export class Attendance extends BaseEntity {
      @PrimaryGeneratedColumn()
      id: number

      @Column()
      employeeId: number

      @Column({ type: 'date' })
      date: Date

      @Column({ type: 'time' })
      checkIn: Date

      @Column({ type: 'time' })
      checkOut: Date

      @Column()
      status: string

      @ManyToOne(() => Employee, employee => employee.attendance)
      employee: Employee
    }
