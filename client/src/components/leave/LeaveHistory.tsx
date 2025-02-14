import React, { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'
    
    interface Leave {
      id: number;
      type: string;
      startDate: string;
      endDate: string;
      days: number;
      status: string;
      reason: string;
    }

    const LeaveHistory = () => {
      const [leaves, setLeaves] = useState<Leave[]>([])
      const [isLoading, setIsLoading] = useState(true)
      const { employeeId } = useParams()

      useEffect(() => {
        axios.get<Leave[]>(`http://localhost:5000/api/employees/${employeeId}/leave-history`)
          .then(response => {
            setLeaves(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching leave history:', error)
            setIsLoading(false)
          })
      }, [employeeId])

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="leave-history">
          <h1>Leave History</h1>
          <div className="leaves">
            {leaves.map(leave => (
              <div key={leave.id} className="leave">
                <p><strong>Type:</strong> {leave.type}</p>
                <p><strong>Dates:</strong> {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</p>
                <p><strong>Days:</strong> {leave.days}</p>
                <p><strong>Status:</strong> {leave.status}</p>
                <p><strong>Reason:</strong> {leave.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default LeaveHistory
