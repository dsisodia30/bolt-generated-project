import React, { useState, useEffect } from 'react'
    import { Link, useNavigate } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'

    const ProjectList = () => {
      const [projects, setProjects] = useState([])
      const [isLoading, setIsLoading] = useState(true)
      const navigate = useNavigate()

      useEffect(() => {
        axios.get('http://localhost:5000/api/projects')
          .then((response: any) => {
            setProjects(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching projects:', error)
            setIsLoading(false)
          })
      }, [])

      if (isLoading) {
        return <Spinner />
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
