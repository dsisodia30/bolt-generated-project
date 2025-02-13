import { Entity } from 'typeorm'
    import { Employee } from '../entities/Employee'
    import { Job } from '../entities/Job'
    import { Contract } from '../entities/Contract'
    import { Salary } from '../entities/Salary'
    import { BaseRepository } from './BaseRepository'

    export class EmployeeRepository extends BaseRepository<Employee> {
      protected getEntity(): new () => Employee {
        return Employee;
      }

      async findOneWithRelations(id: number): Promise<Employee | undefined> {
        return this.findOne(id, {
          relations: ['user', 'jobs', 'contracts', 'salaries']
        });
      }

      async getJobHistory(employeeId: number): Promise<Job[]> {
        const employee = await this.findOne(employeeId);
        if (!employee) throw new Error('Employee not found');
        return employee.jobs;
      }

      async getContracts(employeeId: number): Promise<Contract[]> {
        const employee = await this.findOne(employeeId);
        if (!employee) throw new Error('Employee not found');
        return employee.contracts;
      }

      async getSalaries(employeeId: number): Promise<Salary[]> {
        const employee = await this.findOne(employeeId);
        if (!employee) throw new Error('Employee not found');
        return employee.salaries;
      }
    }
