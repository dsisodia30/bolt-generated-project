import { Request, Response } from 'express';
import { LeaveService } from '../services/LeaveService';
import { validateRequest } from '../middleware/validationMiddleware';
import { createLeaveSchema, updateLeaveSchema } from '../entities/Leave';

export class LeaveController {
  private leaveService: LeaveService;

  constructor() {
    this.leaveService = new LeaveService();
  }

  public async createLeave(req: Request, res: Response): Promise<void> {
    try {
      const leave = await this.leaveService.createLeave(Number(req.params.employeeId), req.body);
      res.status(201).json(leave);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async updateLeaveStatus(req: Request, res: Response): Promise<void> {
    try {
      const leave = await this.leaveService.updateLeaveStatus(
        Number(req.params.id),
        req.body.status,
        req.body.updatedBy
      );
      res.json(leave);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getLeaveHistory(req: Request, res: Response): Promise<void> {
    try {
      const leaves = await this.leaveService.getLeaveHistory(Number(req.params.employeeId));
      res.json(leaves);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async cancelLeave(req: Request, res: Response): Promise<void> {
    try {
      const leave = await this.leaveService.cancelLeave(Number(req.params.id), req.body.updatedBy);
      res.json(leave);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async approveLeave(req: Request, res: Response): Promise<void> {
    try {
      const leave = await this.leaveService.approveLeave(Number(req.params.id), req.body.updatedBy);
      res.json(leave);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async rejectLeave(req: Request, res: Response): Promise<void> {
    try {
      const leave = await this.leaveService.rejectLeave(Number(req.params.id), req.body.updatedBy);
      res.json(leave);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getAllLeaves(req: Request, res: Response): Promise<void> {
    try {
      const leaves = await this.leaveService.getAllLeaves();
      res.json(leaves);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  get router() {
    const router = require('express').Router();
    router.post('/employees/:employeeId/leave', this.createLeave.bind(this));
    router.put('/leave/:id/status', this.updateLeaveStatus.bind(this));
    router.get('/employees/:employeeId/leave-history', this.getLeaveHistory.bind(this));
    router.put('/leave/:id/cancel', this.cancelLeave.bind(this));
    router.put('/leave/:id/approve', this.approveLeave.bind(this));
    router.put('/leave/:id/reject', this.rejectLeave.bind(this));
    router.get('/leaves', this.getAllLeaves.bind(this));
    return router;
  }
}
