import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

    @Entity()
    export class Document extends BaseEntity {
      @PrimaryGeneratedColumn()
      id: number

      @Column()
      name: string

      @Column()
      type: string

      @Column()
      url: string

      @Column()
      employeeId: number

      @ManyToOne(() => Employee, employee => employee.documents)
      employee: Employee
    }
