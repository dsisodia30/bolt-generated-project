import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
      setIsLoading(false);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response: any = await axios.put(`http://localhost:5000/api/users/${user?.id}`, formData);
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="profile-info">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={formData.firstName || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, firstName: e.target.value})}
              readOnly={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={formData.lastName || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, lastName: e.target.value})}
              readOnly={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, username: e.target.value})}
              readOnly={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
              readOnly={!isEditing}
            />
          </div>
        </div>
        {isEditing ? (
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Save Changes'}
          </button>
        ) : (
          <>
            <button onClick={handleEdit}>Edit Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
