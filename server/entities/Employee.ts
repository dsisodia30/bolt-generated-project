import 'reflect-metadata'
import { z } from 'zod'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm'
import { User } from './User'
import { Job } from './Job'
import { Contract } from './Contract'
import { Salary } from './Salary'

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @ManyToOne(() => User, user => user.employees)
  user: User

  @Column()
  employeeId: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column({ type: 'date' })
  dateOfBirth: Date

  @Column()
  gender: string

  @Column()
  maritalStatus: string

  @Column()
  nationality: string

  @Column()
  phone: string

  @Column()
  address: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  zipCode: string

  @Column()
  country: string

  @Column()
  joinedDate: Date

  @Column()
  probationPeriod: string

  @Column()
  probationEnd: Date

  @Column()
  employmentType: string

  @Column()
  jobTitle: string

  @Column()
  department: string

  @Column()
  location: string

  @Column()
  grade: string

  @Column()
  salary: number

  @Column()
  currency: string

  @Column()
  paymentMethod: string

  @Column()
  bankAccount: string

  @Column()
  status: string

  @OneToMany(() => Job, job => job.employee)
  jobs: Job[]

  @OneToMany(() => Contract, contract => contract.employee)
  contracts: Contract[]

  @OneToMany(() => Salary, salary => salary.employee)
  salaries: Salary[]
}

export const createEmployeeSchema = z.object({
  userId: z.number().int(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  dateOfBirth: z.date(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
  nationality: z.string().min(1, 'Nationality is required'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  joinedDate: z.date(),
  probationPeriod: z.string().min(1, 'Probation period is required'),
  probationEnd: z.date(),
  employmentType: z.string().min(1, 'Employment type is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  grade: z.string().min(1, 'Grade is required'),
  salary: z.number().min(0, 'Salary must be a positive number'),
  currency: z.string().min(1, 'Currency is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  bankAccount: z.string().min(1, 'Bank account is required'),
  status: z.enum(['ACTIVE', 'INACTIVE'])
})

export const updateEmployeeSchema = z.object({
  userId: z.number().int().optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']).optional(),
  nationality: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  zipCode: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  joinedDate: z.date().optional(),
  probationPeriod: z.string().min(1).optional(),
  probationEnd: z.date().optional(),
  employmentType: z.string().min(1).optional(),
  jobTitle: z.string().min(1).optional(),
  department: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  grade: z.string().min(1).optional(),
  salary: z.number().min(0).optional(),
  currency: z.string().min(1).optional(),
  paymentMethod: z.string().min(1).optional(),
  bankAccount: z.string().min(1).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional()
})
