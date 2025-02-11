import { PaymentRepository } from '../repositories/PaymentRepository'

    export class PaymentService {
      private paymentRepository: PaymentRepository

      constructor() {
        this.paymentRepository = new PaymentRepository()
      }

      async createPayment(employeeId: number, payment: Partial<Payment>): Promise<Payment> {
        return this.paymentRepository.createPayment(employeeId, payment)
      }

      async updatePaymentStatus(id: number, status: string, updatedBy: string): Promise<Payment> {
        return this.paymentRepository.updatePaymentStatus(id, status, updatedBy)
      }

      async getPaymentHistory(employeeId: number): Promise<Payment[]> {
        return this.paymentRepository.getPaymentHistory(employeeId)
      }

      async getAllPayments(): Promise<Payment[]> {
        return this.paymentRepository.getAllPayments()
      }

      async getPaymentById(id: number): Promise<Payment | undefined> {
        return this.paymentRepository.getPaymentById(id)
      }
    }
