import React, { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../Spinner'

    const JobHistory = () => {
      const [jobs, setJobs] = useState([])
      const [isLoading, setIsLoading] = useState(true)
      const { employeeId } = useParams()

      useEffect(() => {
        axios.get(`http://localhost:5000/api/employees/${employeeId}/job-history`)
          .then(response => {
            setJobs(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching job history:', error)
            setIsLoading(false)
          })
      }, [employeeId])

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="job-history">
          <h1>Job History</h1>
          <div className="jobs">
            {jobs.map(job => (
              <div key={job.id} className="job">
                <p><strong>Job Title:</strong> {job.jobTitle}</p>
                <p><strong>Department:</strong> {job.department}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Start Date:</strong> {new Date(job.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Current'}</p>
                <p><strong>Status:</strong> {job.status}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default JobHistory
