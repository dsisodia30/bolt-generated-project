import { Entity, getRepository } from 'typeorm'
    import { Project } from '../entities/Project'
import { BaseRepository } from './BaseRepository'

    export class ProjectRepository extends BaseRepository<Project> {
      protected getEntity() {
        return Project
      }

      async createProject(project: Partial<Project>): Promise<Project> {
        return this.create(project)
      }

      async updateProject(id: number, project: Partial<Project>): Promise<Project> {
        const existing = await this.findOne(id)
        if (!existing) throw new Error('Project not found')
        return this.update(id, { ...existing, ...project })
      }

      async deleteProject(id: number): Promise<void> {
        const existing = await this.findOne(id)
        if (!existing) throw new Error('Project not found')
        return this.delete(id)
      }

      async getAllProjects(): Promise<Project[]> {
        return this.find({
          relations: ['employees']
        })
      }

      async getProjectById(id: number): Promise<Project | null> {
        return await this.findOne(id, {
          relations: ['employees']
        })
      }
    }
