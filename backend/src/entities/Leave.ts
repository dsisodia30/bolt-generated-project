import { z } from 'zod'
    import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
    import { Employee } from './Employee'
import { ExtendedBaseEntity } from './BaseEntity'

    @Entity()
    export class Leave extends ExtendedBaseEntity {
      @PrimaryGeneratedColumn()
      id!: number

      @Column()
      employeeId!: number

      @ManyToOne(() => Employee, employee => employee.leaves)
      employee!: Employee

      @Column()
      type!: string

      @Column({ type: 'date' })
      startDate!: Date

      @Column({ type: 'date' })
      endDate!: Date

      @Column()
      days!: number

      @Column()
      reason!: string

      @Column()
      status!: string

    }

    export const createLeaveSchema = z.object({
      type: z.enum(['VACATION', 'SICK', 'PERSONAL']),
      startDate: z.date(),
      endDate: z.date(),
      days: z.number().min(1),
      reason: z.string().min(1)
    })

    export const updateLeaveSchema = z.object({
      status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']).optional(),
      reason: z.string().min(1).optional()
    })
