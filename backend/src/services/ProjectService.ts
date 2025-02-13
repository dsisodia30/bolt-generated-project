import { ProjectRepository } from '../repositories/ProjectRepository';
import { Project } from '../entities/Project'; // Importing the Project type

    export class ProjectService {
      private projectRepository: ProjectRepository

      constructor() {
        this.projectRepository = new ProjectRepository()
      }

      async createProject(project: Partial<Project>): Promise<Project> {
        return this.projectRepository.createProject(project)
      }

      async updateProject(id: number, project: Partial<Project>): Promise<Project> {
        return this.projectRepository.updateProject(id, project)
      }

      async deleteProject(id: number): Promise<void> {
        return this.projectRepository.deleteProject(id)
      }

      async getAllProjects(): Promise<Project[]> {
        return this.projectRepository.getAllProjects()
      }

      async getProjectById(id: number): Promise<Project | null> {
        return this.projectRepository.getProjectById(id)
      }
    }
