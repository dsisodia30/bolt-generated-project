import { Entity, getRepository } from 'typeorm'
    import { Project } from '../entities/Project'

    export class ProjectRepository {
      private projectRepository = getRepository(Project)

      async createProject(project: Partial<Project>): Promise<Project> {
        return this.projectRepository.save(project)
      }

      async updateProject(id: number, project: Partial<Project>): Promise<Project> {
        const existing = await this.projectRepository.findOne(id)
        if (!existing) throw new Error('Project not found')
        return this.projectRepository.save({ ...existing, ...project })
      }

      async deleteProject(id: number): Promise<void> {
        const existing = await this.projectRepository.findOne(id)
        if (!existing) throw new Error('Project not found')
        return this.projectRepository.delete(id)
      }

      async getAllProjects(): Promise<Project[]> {
        return this.projectRepository.find({
          relations: ['employees']
        })
      }

      async getProjectById(id: number): Promise<Project | undefined> {
        return this.projectRepository.findOne(id, {
          relations: ['employees']
        })
      }
    }
