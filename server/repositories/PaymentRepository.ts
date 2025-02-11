import { Entity, getRepository } from 'typeorm'
    import { Payment } from '../entities/Payment'

    export class PaymentRepository {
      private paymentRepository = getRepository(Payment)

      async createPayment(employeeId: number, payment: Partial<Payment>): Promise<Payment> {
        const paymentEntity = this.paymentRepository.create({
          ...payment,
          employeeId,
          status: 'PENDING',
          createdBy: 'system',
          createdAt: new Date(),
          updatedAt: new Date()
        })
        return this.paymentRepository.save(paymentEntity)
      }

      async updatePaymentStatus(id: number, status: string, updatedBy: string): Promise<Payment> {
        const payment = await this.paymentRepository.findOne(id)
        if (!payment) throw new Error('Payment not found')

        payment.status = status
        payment.updatedBy = updatedBy
        payment.updatedAt = new Date()

        return this.paymentRepository.save(payment)
      }

      async getPaymentHistory(employeeId: number): Promise<Payment[]> {
        return this.paymentRepository.find({
          where: { employeeId },
          relations: ['employee']
        })
      }

      async getAllPayments(): Promise<Payment[]> {
        return this.paymentRepository.find({
          relations: ['employee']
        })
      }

      async getPaymentById(id: number): Promise<Payment | undefined> {
        return this.paymentRepository.findOne(id, {
          relations: ['employee']
        })
      }
    }
