import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class ExtendedBaseEntity extends BaseEntity {

          @PrimaryGeneratedColumn()
          id!: number

          @Column()
          createdBy!: string
    
          @Column({ type: 'date' })
          createdAt!: Date;
    
          @Column()
          updatedBy!: string; // Added updatedBy property
    
          @Column({ type: 'date' })
          updatedAt!: Date
    
}