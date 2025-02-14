import { useState, useEffect } from 'react'

    import { useNavigate } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'
import { Leave } from '../../types/project'

    const LeaveList = () => {
      const [leaves, setLeaves] = useState<Leave[]>([])
      const [isLoading, setIsLoading] = useState(true)
      const navigate = useNavigate()

      useEffect(() => {
        axios.get<Leave[]>('http://localhost:5000/api/leaves')
          .then(response => {
            setLeaves(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching leaves:', error)
            setIsLoading(false)
          })
      }, [])

      const handleApprove = (id: number) => {
        axios.put(`http://localhost:5000/api/leave/${id}/approve`, { updatedBy: 'admin' })
          .then(() => {
            setLeaves(leaves.map(leave => 
              leave.id === id ? { ...leave, status: 'APPROVED' } : leave
            ))
          })
          .catch(error => {
            console.error('Error approving leave:', error)
          })
      }

      const handleReject = (id: number) => {
        axios.put(`http://localhost:5000/api/leave/${id}/reject`, { updatedBy: 'admin' })
          .then(() => {
            setLeaves(leaves.map(leave => 
              leave.id === id ? { ...leave, status: 'REJECTED' } : leave
            ))
          })
          .catch(error => {
            console.error('Error rejecting leave:', error)
          })
      }

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="leave-list">
          <div className="header">
            <h1>Leave Requests</h1>
            <button onClick={() => navigate('request')}>New Leave Request</button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map(leave => (
                  <tr key={leave.id}>
                    <td>{leave.employee.firstName} {leave.employee.lastName}</td>
                    <td>{leave.type}</td>
                    <td>{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</td>
                    <td>{leave.days}</td>
                    <td>
                      <span className={`status ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleApprove(leave.id)}>Approve</button>
                      <button onClick={() => handleReject(leave.id)}>Reject</button>
                      <button onClick={() => navigate(`${leave.id}/details`)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    export default LeaveList
