import React, { useEffect, useState } from 'react'
    import { Link, useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'
import { Employee } from '../../types/employee'

    const EmployeeDetails = () => {
      const [employee, setEmployee] = useState<Employee>({} as Employee)
      const [isLoading, setIsLoading] = useState(true)
      const { id } = useParams()

      useEffect(() => {
        axios.get<Employee>(`http://localhost:5000/api/employees/${id}`)
          .then(response => {
            setEmployee(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching employee:', error)
            setIsLoading(false)
          })
      }, [id])

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="employee-details">
          <h1>Employee Details</h1>
          <div className="details">
            <div className="section">
              <h2>Personal Information</h2>
              <p><strong>First Name:</strong> {employee.firstName}</p>
              <p><strong>Last Name:</strong> {employee.lastName}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
              <p><strong>Address:</strong> {employee.address}</p>
            </div>
            <div className="section">
              <h2>Employment Information</h2>
              <p><strong>Job Title:</strong> {employee.jobTitle}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Location:</strong> {employee.location}</p>
              <p><strong>Employment Type:</strong> {employee.employmentType}</p>
              <p><strong>Status:</strong> <span className={`status ${employee.status.toLowerCase()}`}>{employee.status}</span></p>
            </div>
          </div>
          <div className="actions">
            <Link to={`/employees/${id}/edit`}>Edit</Link>
            <Link to="/employees">Back to List</Link>
          </div>
        </div>
      )
    }

    export default EmployeeDetails
