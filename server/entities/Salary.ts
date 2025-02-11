import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
    import { Employee } from './Employee'

    @Entity()
    export class Salary extends BaseEntity {
      @PrimaryGeneratedColumn()
      id: number

      @Column()
      employeeId: number

      @ManyToOne(() => Employee, employee => employee.salaries)
      employee: Employee

      @Column()
      salaryId: string

      @Column()
      amount: number

      @Column()
      currency: string

      @Column()
      paymentMethod: string

      @Column()
      effectiveDate: Date

      @Column()
      notes: string
    }
