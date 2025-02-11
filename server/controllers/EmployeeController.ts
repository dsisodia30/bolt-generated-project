import { Request, Response } from 'express'
    import { EmployeeService } from '../services/EmployeeService'
    import { createEmployeeSchema, updateEmployeeSchema } from '../entities/Employee'
    import { validateRequest } from '../middleware/validationMiddleware'

    export class EmployeeController {
      private employeeService: EmployeeService

      constructor() {
        this.employeeService = new EmployeeService()
      }

      public async getAll(req: Request, res: Response): Promise<void> {
        try {
          const employees = await this.employeeService.getAll()
          res.json(employees)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async getOne(req: Request, res: Response): Promise<void> {
        try {
          const id = Number(req.params.id)
          const employee = await this.employeeService.getOne(id)
          if (!employee) {
            res.status(404).json({ message: 'Employee not found' })
            return
          }
          res.json(employee)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async create(req: Request, res: Response): Promise<void> {
        try {
          const result = await this.employeeService.create(req.body)
          res.status(201).json(result)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async update(req: Request, res: Response): Promise<void> {
        try {
          const id = Number(req.params.id)
          const result = await this.employeeService.update(id, req.body)
          res.json(result)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async getJobHistory(req: Request, res: Response): Promise<void> {
        try {
          const { employeeId } = req.params
          const jobs = await this.employeeService.getJobHistory(Number(employeeId))
          res.json(jobs)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async getContracts(req: Request, res: Response): Promise<void> {
        try {
          const { employeeId } = req.params
          const contracts = await this.employeeService.getContracts(Number(employeeId))
          res.json(contracts)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async getSalaries(req: Request, res: Response): Promise<void> {
        try {
          const { employeeId } = req.params
          const salaries = await this.employeeService.getSalaries(Number(employeeId))
          res.json(salaries)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      get router() {
        const router = require('express').Router()
        router.get('/', this.getAll.bind(this))
        router.get('/:id', this.getOne.bind(this))
        router.post('/', validateRequest(createEmployeeSchema), this.create.bind(this))
        router.put('/:id', validateRequest(updateEmployeeSchema), this.update.bind(this))
        router.get('/:id/job-history', this.getJobHistory.bind(this))
        router.get('/:id/contracts', this.getContracts.bind(this))
        router.get('/:id/salaries', this.getSalaries.bind(this))
        return router
      }
    }
