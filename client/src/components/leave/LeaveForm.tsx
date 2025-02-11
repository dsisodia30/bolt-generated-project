import React, { useState } from 'react'
    import { useNavigate, useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'

    const LeaveForm = () => {
      const [formData, setFormData] = useState({
        type: 'VACATION',
        startDate: '',
        endDate: '',
        days: 1,
        reason: ''
      })
      const [isLoading, setIsLoading] = useState(false)
      const navigate = useNavigate()
      const { id } = useParams()

      useEffect(() => {
        if (id) {
          axios.get(`http://localhost:5000/api/leave/${id}`)
            .then(response => {
              const leave = response.data
              setFormData({
                type: leave.type,
                startDate: leave.startDate,
                endDate: leave.endDate,
                days: leave.days,
                reason: leave.reason
              })
            })
            .catch(error => {
              console.error('Error fetching leave:', error)
            })
        }
      }, [id])

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const endpoint = id ? `http://localhost:5000/api/leave/${id}` : 'http://localhost:5000/api/leave'
        const method = id ? 'PUT' : 'POST'

        axios({ method, url: endpoint, data: formData })
          .then(() => {
            setIsLoading(false)
            navigate('/leave')
          })
          .catch(error => {
            console.error('Error saving leave:', error)
            setIsLoading(false)
          })
      }

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="leave-form">
          <h1>{id ? 'Edit Leave Request' : 'New Leave Request'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Type:</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="VACATION">Vacation</option>
                <option value="SICK">Sick</option>
                <option value="PERSONAL">Personal</option>
              </select>
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Number of Days:</label>
              <input
                type="number"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>Reason:</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      )
    }

    export default LeaveForm
