import { Entity, getRepository } from 'typeorm'
    import { Payment } from '../entities/Payment'
import { BaseRepository } from './BaseRepository';

    export class PaymentRepository extends BaseRepository<Payment> {
      protected getEntity(): new () => Payment {
        return Payment
      }

      async createPayment(employeeId: number, payment: Partial<Payment>): Promise<Payment> {
        const paymentEntity = await this.create({
          ...payment,
          employeeId,
          status: 'PENDING',
          createdBy: 'system',
          createdAt: new Date(),
          updatedAt: new Date()
        })
        return paymentEntity;
      }

      async updatePaymentStatus(id: number, status: string, updatedBy: string): Promise<Payment> {
        const payment = await this.findOne(id)
        if (!payment) throw new Error('Payment not found')

        payment.status = status
        payment.updatedBy = updatedBy
        payment.updatedAt = new Date()

        return await this.update(id, payment)
      }

      async getPaymentHistory(employeeId: number): Promise<Payment[]> {
        return this.find({
          where: { employeeId },
          relations: ['employee']
        })
      }

      async getAllPayments(): Promise<Payment[]> {
        return this.find({
          relations: ['employee']
        })
      }

      async getPaymentById(id: number): Promise<Payment | null> {
        return await this.findOne(id, {
          relations: ['employee']
        })
      }
    }
