import React, { useState, useEffect } from 'react'
    import { Link, useNavigate } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'

    const EmployeeList = () => {
      const [employees, setEmployees] = useState([])
      const [isLoading, setIsLoading] = useState(true)
      const navigate = useNavigate()

      useEffect(() => {
        axios.get('http://localhost:5000/api/employees')
          .then(response => {
            setEmployees(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching employees:', error)
            setIsLoading(false)
          })
      }, [])

      const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this employee?')) {
          axios.delete(`http://localhost:5000/api/employees/${id}`)
            .then(() => {
              setEmployees(employees.filter(employee => employee.id !== id))
            })
            .catch(error => {
              console.error('Error deleting employee:', error)
            })
        }
      }

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="employee-list">
          <div className="header">
            <h1>Employees</h1>
            <button onClick={() => navigate('create')}>Add New Employee</button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>
                      <Link to={`${employee.id}/details`}>
                        {employee.firstName} {employee.lastName}
                      </Link>
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.jobTitle}</td>
                    <td>{employee.department}</td>
                    <td>
                      <span className={`status ${employee.status.toLowerCase()}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => navigate(`${employee.id}/edit`)}>Edit</button>
                      <button onClick={() => handleDelete(employee.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    export default EmployeeList
