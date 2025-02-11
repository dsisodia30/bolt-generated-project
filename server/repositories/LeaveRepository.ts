import { Entity, getRepository } from 'typeorm'
    import { Leave } from '../entities/Leave'

    export class LeaveRepository {
      private leaveRepository = getRepository(Leave)

      async createLeave(employeeId: number, leave: Partial<Leave>): Promise<Leave> {
        const leaveEntity = this.leaveRepository.create({
          ...leave,
          employeeId,
          status: 'PENDING',
          createdBy: 'system',
          createdAt: new Date(),
          updatedAt: new Date()
        })
        return this.leaveRepository.save(leaveEntity)
      }

      async updateLeaveStatus(id: number, status: string, updatedBy: string): Promise<Leave> {
        const leave = await this.leaveRepository.findOne(id)
        if (!leave) throw new Error('Leave not found')

        leave.status = status
        leave.updatedBy = updatedBy
        leave.updatedAt = new Date()

        return this.leaveRepository.save(leave)
      }

      async getLeaveHistory(employeeId: number): Promise<Leave[]> {
        return this.leaveRepository.find({
          where: { employeeId },
          relations: ['employee']
        })
      }

      async cancelLeave(id: number, updatedBy: string): Promise<Leave> {
        return this.updateLeaveStatus(id, 'CANCELLED', updatedBy)
      }

      async approveLeave(id: number, updatedBy: string): Promise<Leave> {
        return this.updateLeaveStatus(id, 'APPROVED', updatedBy)
      }

      async rejectLeave(id: number, updatedBy: string): Promise<Leave> {
        return this.updateLeaveStatus(id, 'REJECTED', updatedBy)
      }

      async getAllLeaves(): Promise<Leave[]> {
        return this.leaveRepository.find({
          relations: ['employee']
        })
      }

      async getLeaveById(id: number): Promise<Leave | undefined> {
        return this.leaveRepository.findOne(id, {
          relations: ['employee']
        })
      }
    }
