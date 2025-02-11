import { Request, Response } from 'express'
    import { PaymentService } from '../services/PaymentService'
    import { validateRequest } from '../middleware/validationMiddleware'
    import { createPaymentSchema, updatePaymentSchema } from '../entities/Payment'

    export class PaymentController {
      private paymentService: PaymentService

      constructor() {
        this.paymentService = new PaymentService()
      }

      public async createPayment(req: Request, res: Response): Promise<void> {
        try {
          const payment = await this.paymentService.createPayment(req.params.employeeId, req.body)
          res.status(201).json(payment)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async updatePaymentStatus(req: Request, res: Response): Promise<void> {
        try {
          const payment = await this.paymentService.updatePaymentStatus(
            req.params.id,
            req.body.status,
            req.body.updatedBy
          )
          res.json(payment)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async getPaymentHistory(req: Request, res: Response): Promise<void> {
        try {
          const payments = await this.paymentService.getPaymentHistory(req.params.employeeId)
          res.json(payments)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async getAllPayments(req: Request, res: Response): Promise<void> {
        try {
          const payments = await this.paymentService.getAllPayments()
          res.json(payments)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      get router() {
        const router = require('express').Router()
        router.post('/employees/:employeeId/payment', this.createPayment.bind(this))
        router.put('/payment/:id/status', this.updatePaymentStatus.bind(this))
        router.get('/employees/:employeeId/payment-history', this.getPaymentHistory.bind(this))
        router.get('/payments', this.getAllPayments.bind(this))
        return router
      }
    }
