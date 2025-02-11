import React, { useState, useEffect } from 'react'
    import axios from 'axios'

    const Employees = () => {
      const [employees, setEmployees] = useState([])

      useEffect(() => {
        axios.get('http://localhost:5000/api/employees')
          .then(response => setEmployees(response.data))
          .catch(error => console.error('Error fetching employees:', error))
      }, [])

      return (
        <div>
          <h1>Employees</h1>
          <ul>
            {employees.map(employee => (
              <li key={employee.id}>
                {employee.user.firstName} {employee.user.lastName}
              </li>
            ))}
          </ul>
        </div>
      )
    }

    export default Employees
