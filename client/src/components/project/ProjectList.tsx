import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'
import type { Project } from '../../types/project'


    const ProjectList = () => {
      const [projects, setProjects] = useState<Project[]>([])
      const [isLoading, setIsLoading] = useState(true)
      const [error, setError] = useState<string | null>(null)
      const navigate = useNavigate()


      useEffect(() => {
        axios.get('http://localhost:5000/api/projects')
          .then((response: any) => {
            setProjects(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching projects:', error)
            setError('Failed to load projects. Please try again later.')
            setIsLoading(false)
          })

      }, [])

      if (isLoading) {
        return (
          <div className="loading-state">
            <Spinner />
            <p>Loading projects...</p>
          </div>
        )
      }

      if (error) {
        return (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )
      }

      if (projects.length === 0) {
        return (
          <div className="empty-state">
            <p>No projects found.</p>
            <button onClick={() => navigate('create')}>Create New Project</button>
          </div>
        )
      }


      return (
        <div className="project-list">
          <div className="header">
            <h1>Projects</h1>
            <button onClick={() => navigate('create')}>New Project</button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project: any) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{new Date(project.startDate).toLocaleDateString()}</td>
                    <td>{new Date(project.endDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status ${project.status.toLowerCase()}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => navigate(`${project.id}/details`)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    export default ProjectList
