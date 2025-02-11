import React from 'react'
    import { useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'

    const SalaryDetails = () => {
      const [payment, setPayment] = useState({})
      const [isLoading, setIsLoading] = useState(true)
      const { id } = useParams()

      useEffect(() => {
        axios.get(`http://localhost:5000/api/payment/${id}`)
          .then(response => {
            setPayment(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching payment:', error)
            setIsLoading(false)
          })
      }, [id])

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="salary-details">
          <h1>Payment Details</h1>
          <div className="details">
            <div className="section">
              <h2>Payment Information</h2>
              <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> {payment.amount}</p>
              <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>
              <p><strong>Status:</strong> <span className={`status ${payment.status.toLowerCase()}`}>{payment.status}</span></p>
            </div>
            <div className="section">
              <h2>Employee Information</h2>
              <p><strong>Employee:</strong> {payment.employee.firstName} {payment.employee.lastName}</p>
              <p><strong>Email:</strong> {payment.employee.email}</p>
              <p><strong>Department:</strong> {payment.employee.department}</p>
            </div>
            <div className="section">
              <h2>Payment History</h2>
              <div className="payment-history">
                <p><strong>Created By:</strong> {payment.createdBy}</p>
                <p><strong>Created At:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
                <p><strong>Updated By:</strong> {payment.updatedBy}</p>
                <p><strong>Updated At:</strong> {new Date(payment.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="actions">
            <button onClick={() => window.history.back()}>Back</button>
          </div>
        </div>
      )
    }

    export default SalaryDetails
