import { Entity, getRepository } from 'typeorm';
import { Leave } from '../entities/Leave';
import { BaseRepository } from './BaseRepository';

export class LeaveRepository extends BaseRepository<Leave> {
  protected getEntity(): new () => Leave {
    return Leave;
  }

  async createLeave(employeeId: number, leave: Partial<Leave>): Promise<Leave> {
    const leaveEntity = await this.create({
      ...leave,
      employeeId,
      status: 'PENDING',
      createdBy: 'system', // Ensure this property exists in Leave entity
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return leaveEntity;
  }

  async updateLeaveStatus(id: number, status: string, updatedBy: string): Promise<Leave> {
    const leave = await this.findOne(id);
    if (!leave) throw new Error('Leave not found');

    leave.status = status;
    leave.updatedBy = updatedBy; // Ensure updatedBy is a valid property on Leave
    leave.updatedAt = new Date();

    return this.update(id, leave);
  }

  async getLeaveHistory(employeeId: number): Promise<Leave[]> {
    return this.find({
      where: { employeeId },
      relations: ['employee'],
    });
  }

  async cancelLeave(id: number, updatedBy: string): Promise<Leave> {
    return this.updateLeaveStatus(id, 'CANCELLED', updatedBy);
  }

  async approveLeave(id: number, updatedBy: string): Promise<Leave> {
    return this.updateLeaveStatus(id, 'APPROVED', updatedBy);
  }

  async rejectLeave(id: number, updatedBy: string): Promise<Leave> {
    return this.updateLeaveStatus(id, 'REJECTED', updatedBy);
  }

  async getAllLeaves(): Promise<Leave[]> {
    return this.find({
      relations: ['employee'],
    });
  }

  async getLeaveById(id: number): Promise<Leave | null> {
    return await this.findOne(id, {
      relations: ['employee'],
    });
  }

    
}