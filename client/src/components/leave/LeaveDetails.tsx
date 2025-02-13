import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

interface Leave {
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  employee: User;
  status: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

const LeaveDetails: React.FC = () => {
  const [leave, setLeave] = useState<Leave | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get<Leave>(`http://localhost:5000/api/leave/${id}`)
      .then(response => {
        setLeave(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leave:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="leave-details">
      <h1>Leave Request Details</h1>
      <div className="details">
        <div className="section">
          <h2>Leave Information</h2>
          <p><strong>Type:</strong> {leave?.type}</p>
          <p><strong>Start Date:</strong> {leave?.startDate ? new Date(leave.startDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>End Date:</strong> {leave?.endDate ? new Date(leave.endDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Days:</strong> {leave?.days}</p>
          <p><strong>Reason:</strong> {leave?.reason}</p>
        </div>
        <div className="section">
          <h2>Employee Information</h2>
          <p><strong>Employee:</strong> {leave?.employee.firstName} {leave?.employee.lastName}</p>
          <p><strong>Email:</strong> {leave?.employee.email}</p>
          <p><strong>Department:</strong> {leave?.employee.department}</p>
        </div>
        <div className="section">
          <h2>Status History</h2>
          <div className="status-history">
            <p><strong>Status:</strong> {leave?.status}</p>
            <p><strong>Created By:</strong> {leave?.createdBy}</p>
            <p><strong>Updated By:</strong> {leave?.updatedBy}</p>
            <p><strong>Created At:</strong> {leave?.createdAt ? new Date(leave.createdAt).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Updated At:</strong> {leave?.updatedAt ? new Date(leave.updatedAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => window.history.back()}>Back</button>
      </div>
    </div>
  );
}

export default LeaveDetails;
