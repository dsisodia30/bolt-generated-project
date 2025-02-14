import React, { useEffect, useState } from 'react'
    import { useNavigate, useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'
import { Employee } from '../../types/employee'

    const EmployeeForm = () => {
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        department: '',
        location: '',
        employmentType: 'FULL_TIME',
        status: 'ACTIVE'
      })
      const [isLoading, setIsLoading] = useState(false)
      const navigate = useNavigate()
      const { id } = useParams()

      useEffect(() => {
        if (id) {
          axios.get<Employee>(`http://localhost:5000/api/employees/${id}`)
            .then(response => {
              const employee = response.data
              setFormData({
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                jobTitle: employee.jobTitle,
                department: employee.department,
                location: employee.location,
                employmentType: employee.employmentType,
                status: employee.status
              })
            })
            .catch(error => {
              console.error('Error fetching employee:', error)
            })
        }
      }, [id])

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const endpoint = id ? `http://localhost:5000/api/employees/${id}` : 'http://localhost:5000/api/employees'
        const method = id ? 'PUT' : 'POST'

        axios({ method, url: endpoint, data: formData })
          .then(() => {
            setIsLoading(false)
            navigate('/employees')
          })
          .catch(error => {
            console.error('Error saving employee:', error)
            setIsLoading(false)
          })
      }

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="employee-form">
          <h1>{id ? 'Edit Employee' : 'Create New Employee'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Job Title:</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Employment Type:</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      )
    }

    export default EmployeeForm
