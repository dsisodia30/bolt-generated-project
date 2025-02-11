import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
    import { Employee } from './Employee'

    @Entity()
    export class Project extends BaseEntity {
      @PrimaryGeneratedColumn()
      id: number

      @Column()
      name: string

      @Column()
      description: string

      @Column({ type: 'date' })
      startDate: Date

      @Column({ type: 'date' })
      endDate: Date

      @Column()
      status: string

      @ManyToMany(() => Employee, employee => employee.projects)
      @JoinTable()
      employees: Employee[]
    }
