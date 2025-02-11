import React from 'react'
    import { useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'

    const LeaveDetails = () => {
      const [leave, setLeave] = useState({})
      const [isLoading, setIsLoading] = useState(true)
      const { id } = useParams()

      useEffect(() => {
        axios.get(`http://localhost:5000/api/leave/${id}`)
          .then(response => {
            setLeave(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching leave:', error)
            setIsLoading(false)
          })
      }, [id])

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="leave-details">
          <h1>Leave Request Details</h1>
          <div className="details">
            <div className="section">
              <h2>Leave Information</h2>
              <p><strong>Type:</strong> {leave.type}</p>
              <p><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
              <p><strong>Days:</strong> {leave.days}</p>
              <p><strong>Reason:</strong> {leave.reason}</p>
            </div>
            <div className="section">
              <h2>Employee Information</h2>
              <p><strong>Employee:</strong> {leave.employee.firstName} {leave.employee.lastName}</p>
              <p><strong>Email:</strong> {leave.employee.email}</p>
              <p><strong>Department:</strong> {leave.employee.department}</p>
            </div>
            <div className="section">
              <h2>Status History</h2>
              <div className="status-history">
                <p><strong>Status:</strong> {leave.status}</p>
                <p><strong>Created By:</strong> {leave.createdBy}</p>
                <p><strong>Updated By:</strong> {leave.updatedBy}</p>
                <p><strong>Created At:</strong> {new Date(leave.createdAt).toLocaleDateString()}</p>
                <p><strong>Updated At:</strong> {new Date(leave.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="actions">
            <button onClick={() => window.history.back()}>Back</button>
          </div>
        </div>
      )
    }

    export default LeaveDetails
