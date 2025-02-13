import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm'
import { z } from 'zod'
import { Employee } from './Employee' // Import Employee entity
import { ExtendedBaseEntity } from './BaseEntity'

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.string().optional(),
})

export const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.string().optional(),
})

@Entity()
export class Project extends ExtendedBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ nullable: true, type: 'text' }) // Explicitly specify type
  description!: string | null

  @Column({ type: 'date' })
  startDate!: Date

  @Column({ type: 'date' })
  endDate!: Date

  @Column({ nullable: true, type: 'varchar' }) // Explicitly specify type
  status!: string | null

  @ManyToMany(() => Employee)
  @JoinTable()
  employees!: Employee[]
}
