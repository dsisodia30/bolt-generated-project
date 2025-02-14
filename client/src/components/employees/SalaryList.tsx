import React, { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'
    
    interface Salary {
      id: number;
      salaryId: string;
      amount: number;
      currency: string;
      paymentMethod: string;
      effectiveDate: string;
      notes: string;
    }

    const SalaryList = () => {
      const [salaries, setSalaries] = useState<Salary[]>([])
      const [isLoading, setIsLoading] = useState(true)
      const { employeeId } = useParams()

      useEffect(() => {
        axios.get<Salary[]>(`http://localhost:5000/api/employees/${employeeId}/salaries`)
          .then(response => {
            setSalaries(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching salaries:', error)
            setIsLoading(false)
          })
      }, [employeeId])

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="salary-list">
          <h1>Salaries</h1>
          <div className="salaries">
            {salaries.map(salary => (
              <div key={salary.id} className="salary">
                <p><strong>Salary ID:</strong> {salary.salaryId}</p>
                <p><strong>Amount:</strong> {salary.amount}</p>
                <p><strong>Currency:</strong> {salary.currency}</p>
                <p><strong>Payment Method:</strong> {salary.paymentMethod}</p>
                <p><strong>Effective Date:</strong> {new Date(salary.effectiveDate).toLocaleDateString()}</p>
                <p><strong>Notes:</strong> {salary.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default SalaryList
