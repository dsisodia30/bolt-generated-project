import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import axios from 'axios'
    // import Spinner from '../components/Spinner'

    const Login = () => {
      const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
      })
      const [isLoading, setIsLoading] = useState(false)
      const [error, setError] = useState('')

      const navigate = useNavigate()

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', {
            username: formData.username,
            password: formData.password
          })

          const { token, user } = response.data
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          
          navigate('/profile')
        } catch (error) {
          setError('Invalid username or password')
        } finally {
          setIsLoading(false)
        }
      }

      return (
        <div className="auth-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
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
              <label>
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                />
                Remember me
              </label>
            </div>
            {error && <div className="error-message">{error}</div>}
            {/* <button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Login'}
            </button> */}
            <button type="submit" disabled={isLoading}>
              {isLoading ? '' : 'Login'}
            </button>
          </form>
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      )
    }

    export default Login
