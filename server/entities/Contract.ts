import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
    import { Employee } from './Employee'

    @Entity()
    export class Contract extends BaseEntity {
      @PrimaryGeneratedColumn()
      id: number

      @Column()
      employeeId: number

      @ManyToOne(() => Employee, employee => employee.contracts)
      employee: Employee

      @Column()
      contractId: string

      @Column()
      type: string

      @Column()
      startDate: Date

      @Column()
      endDate: Date

      @Column()
      status: string

      @Column()
      notes: string
    }
