import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Spinner from '../Spinner'
import type { Payment } from '../../types/payment'



    const SalaryList = () => {
      const [payments, setPayments] = useState<Payment[]>([])

      const [isLoading, setIsLoading] = useState(true)
      const navigate = useNavigate()

      const getPayments = async () => {
        try {
          const response = await axios.get<Payment[]>('http://localhost:5000/api/payments')
          const payments = response.data


          setPayments(payments)
          setIsLoading(false)          
        } catch(error) {
          console.error('Error fetching payments:', error)
          setIsLoading(false)
        } 
      }

      useEffect(() => {
        getPayments();
      }, [])

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="salary-list">
          <div className="header">
            <h1>Salary Payments</h1>
            <button onClick={() => navigate('create')}>New Payment</button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Payment Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment: Payment) => (

                  <tr key={payment.id}>
                    <td>{payment.employee.firstName} {payment.employee.lastName}</td>
                    <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>
                      <span className={`status ${payment.status.toLowerCase()}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => navigate(`${payment.id}/details`)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    export default SalaryList
