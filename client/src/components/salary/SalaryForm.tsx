import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'
import type { Payment } from '../../types/payment'


    const SalaryForm = () => {
      const [formData, setFormData] = useState<Payment>({
        id: '',
        employee: { firstName: '', lastName: '' },
        paymentDate: '',
        amount: 0,
        paymentMethod: 'BANK_TRANSFER',
        status: 'Pending'
      })

      const [isLoading, setIsLoading] = useState(false)
      const navigate = useNavigate()
      const { id } = useParams()

      useEffect(() => {
        const fetchPayment = async () => {
          if (id) {
            try {
          const response = await axios.get<Payment>(`http://localhost:5000/api/payment/${id}`)

              setFormData({
                paymentDate: response.data.paymentDate,
                amount: response.data.amount,
                paymentMethod: response.data.paymentMethod,
                status: response.data.status,
                id: id,
                employee: response.data.employee
              })
            } catch (error) {
              console.error('Error fetching payment:', error)
            }
          }
        }
        fetchPayment()
      }, [id])


      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
          const endpoint = id ? `http://localhost:5000/api/payment/${id}` : 'http://localhost:5000/api/payment'
          const method = id ? 'PUT' : 'POST'
          
          await axios<Payment>({ method, url: endpoint, data: formData })

          navigate('/salary')
        } catch (error) {
          console.error('Error saving payment:', error)
        } finally {
          setIsLoading(false)
        }
      }


      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="salary-form">
          <h1>{id ? 'Edit Payment' : 'New Payment'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Payment Date:</label>
              <input
                type="date"
                value={formData.paymentDate}
                onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>Payment Method:</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CHEQUE">Cheque</option>
                <option value="CASH">Cash</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Paid' | 'Pending' | 'Failed' })}
              >
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>
        </div>
      )
    }

    export default SalaryForm
