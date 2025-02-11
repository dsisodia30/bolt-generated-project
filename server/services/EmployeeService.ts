import { EmployeeRepository } from '../repositories/EmployeeRepository'
    import { createEmployeeSchema, Employee, updateEmployeeSchema } from '../entities/Employee'
import { Contract } from '../entities/Contract';
import { Job } from '../entities/Job';
import { Salary } from '../entities/Salary';

    export class EmployeeService {
      private employeeRepository: EmployeeRepository

      constructor() {
        this.employeeRepository = new EmployeeRepository()
      }

      async getAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
      }

      async getOne(id: number): Promise<Employee | undefined> {
        return this.employeeRepository.findOneWithRelations(id);
      }

      async create(employee: Partial<Employee>): Promise<Employee> {
        return this.employeeRepository.create(employee);
      }

      async update(id: number, employee: Partial<Employee>): Promise<Employee> {
        return this.employeeRepository.update(id, employee);
      }

      async getJobHistory(employeeId: number): Promise<Job[]> {
        return this.employeeRepository.getJobHistory(employeeId);
      }

      async getContracts(employeeId: number): Promise<Contract[]> {
        return this.employeeRepository.getContracts(employeeId);
      }

      async getSalaries(employeeId: number): Promise<Salary[]> {
        return this.employeeRepository.getSalaries(employeeId);
      }
    }
