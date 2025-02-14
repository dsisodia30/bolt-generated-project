import React, { useEffect, useState } from 'react'
    import { useNavigate, useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'
import { Project } from '../../types/project'

    const ProjectForm = () => {
      const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'PLANNING'
      })
      const [isLoading, setIsLoading] = useState(false)
      const navigate = useNavigate()
      const { id } = useParams()

      useEffect(() => {
        if (id) {
          axios.get<Project>(`http://localhost:5000/api/projects/${id}`)
            .then(response => {
              const project = response.data
              setFormData({
                name: project.name,
                description: project.description,
                startDate: project.startDate,
                endDate: project.endDate,
                status: project.status
              })
            })
            .catch(error => {
              console.error('Error fetching project:', error)
            })
        }
      }, [id])

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const endpoint = id ? `http://localhost:5000/api/projects/${id}` : 'http://localhost:5000/api/projects'
        const method = id ? 'PUT' : 'POST'

        axios({ method, url: endpoint, data: formData })
          .then(() => {
            setIsLoading(false)
            navigate('/projects')
          })
          .catch(error => {
            console.error('Error saving project:', error)
            setIsLoading(false)
          })
      }

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="project-form">
          <h1>{id ? 'Edit Project' : 'New Project'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Save'}
            </button>
          </form>
        </div>
      )
    }

    export default ProjectForm
