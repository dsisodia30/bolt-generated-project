import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/ProjectService';
import { validateRequest } from '../middleware/validationMiddleware';
import { createProjectSchema, updateProjectSchema } from '../entities/Project';

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  public async createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await this.projectService.createProject(createProjectSchema.parse(req.body));
      res.status(201).json(project);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await this.projectService.updateProject(
        Number(req.params.id), // Convert id to number
        updateProjectSchema.parse(req.body)
      );
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      await this.projectService.deleteProject(Number(req.params.id)); // Convert id to number
      res.status(204).json();
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await this.projectService.getAllProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const project = await this.projectService.getProjectById(Number(req.params.id)); // Convert id to number
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  get router() {
    const router = require('express').Router();
    router.post('/', this.createProject.bind(this));
    router.put('/:id', this.updateProject.bind(this));
    router.delete('/:id', this.deleteProject.bind(this));
    router.get('/', this.getAllProjects.bind(this));
    router.get('/:id', this.getProjectById.bind(this));
    return router;
  }
}
