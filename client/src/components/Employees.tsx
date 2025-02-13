import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  firstName: string;
  lastName: string;
}

interface Employee {
  id: number;
  user: User;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    axios.get<Employee[]>('http://localhost:5000/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

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
  );
}

export default Employees;
