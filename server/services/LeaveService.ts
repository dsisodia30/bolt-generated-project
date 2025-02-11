import { Leave } from '../entities/Leave'
import { LeaveRepository } from '../repositories/LeaveRepository'

    export class LeaveService {
      private leaveRepository: LeaveRepository

      constructor() {
        this.leaveRepository = new LeaveRepository()
      }

      async createLeave(employeeId: number, leave: Partial<Leave>): Promise<Leave> {
        return this.leaveRepository.createLeave(employeeId, leave)
      }

      async updateLeaveStatus(id: number, status: string, updatedBy: string): Promise<Leave> {
        return this.leaveRepository.updateLeaveStatus(id, status, updatedBy)
      }

      async getLeaveHistory(employeeId: number): Promise<Leave[]> {
        return this.leaveRepository.getLeaveHistory(employeeId)
      }

      async cancelLeave(id: number, updatedBy: string): Promise<Leave> {
        return this.leaveRepository.cancelLeave(id, updatedBy)
      }

      async approveLeave(id: number, updatedBy: string): Promise<Leave> {
        return this.leaveRepository.approveLeave(id, updatedBy)
      }

      async rejectLeave(id: number, updatedBy: string): Promise<Leave> {
        return this.leaveRepository.rejectLeave(id, updatedBy)
      }

      async getAllLeaves(): Promise<Leave[]> {
        return this.leaveRepository.getAllLeaves()
      }

      async getLeaveById(id: number): Promise<Leave | undefined> {
        return this.leaveRepository.getLeaveById(id)
      }
    }
