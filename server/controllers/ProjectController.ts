import { Request, Response } from 'express'
    import { ProjectService } from '../services/ProjectService'
    import { validateRequest } from '../middleware/validationMiddleware'
    import { createProjectSchema, updateProjectSchema } from '../entities/Project'

    export class ProjectController {
      private projectService: ProjectService

      constructor() {
        this.projectService = new ProjectService()
      }

      public async createProject(req: Request, res: Response): Promise<void> {
        try {
          const project = await this.projectService.createProject(req.body)
          res.status(201).json(project)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async updateProject(req: Request, res: Response): Promise<void> {
        try {
          const project = await this.projectService.updateProject(req.params.id, req.body)
          res.json(project)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async deleteProject(req: Request, res: Response): Promise<void> {
        try {
          await this.projectService.deleteProject(req.params.id)
          res.status(204).json()
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async getAllProjects(req: Request, res: Response): Promise<void> {
        try {
          const projects = await this.projectService.getAllProjects()
          res.json(projects)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      public async getProjectById(req: Request, res: Response): Promise<void> {
        try {
          const project = await this.projectService.getProjectById(req.params.id)
          res.json(project)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }

      get router() {
        const router = require('express').Router()
        router.post('/', this.createProject.bind(this))
        router.put('/:id', this.updateProject.bind(this))
        router.delete('/:id', this.deleteProject.bind(this))
        router.get('/', this.getAllProjects.bind(this))
        router.get('/:id', this.getProjectById.bind(this))
        return router
      }
    }
