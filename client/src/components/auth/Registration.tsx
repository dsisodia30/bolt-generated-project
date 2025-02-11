import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import axios from 'axios'
    import Spinner from '../components/Spinner'

    const Registration = () => {
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      const [isLoading, setIsLoading] = useState(false)
      const [error, setError] = useState('')

      const navigate = useNavigate()

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }

        try {
          const response = await axios.post('http://localhost:5000/api/auth/register', {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password
          })

          const { token, user } = response.data
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          
          navigate('/profile')
        } catch (error) {
          setError('Registration failed. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }

      return (
        <div className="auth-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Register'}
            </button>
          </form>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      )
    }

    export default Registration
