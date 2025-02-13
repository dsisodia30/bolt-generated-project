import { z } from 'zod'
    import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm'
    import { Employee } from './Employee'
import { ExtendedBaseEntity } from './BaseEntity'

    @Entity()
    export class Payment extends ExtendedBaseEntity {
      @PrimaryGeneratedColumn()
      id!: number

      @Column()
      employeeId!: number

      @ManyToOne(() => Employee, employee => employee.payments)
      employee!: Employee

      @Column()
      paymentDate!: Date

      @Column()
      amount!: number

      @Column()
      paymentMethod!: string

      @Column()
      status!: string

      @Column()
      createdBy!: string

      @Column({ type: 'date' })
      createdAt!: Date

      @Column({ type: 'date' })
      updatedAt!: Date

      @Column({ type: 'date' })
      updatedBy!: string
    }

    export const createPaymentSchema = z.object({
      paymentDate: z.date(),
      amount: z.number().min(0),
      paymentMethod: z.enum(['BANK_TRANSFER', 'CHEQUE', 'CASH']),
      status: z.enum(['PENDING', 'PAID', 'FAILED']).optional()
    })

    export const updatePaymentSchema = z.object({
      status: z.enum(['PENDING', 'PAID', 'FAILED']).optional()
    })
