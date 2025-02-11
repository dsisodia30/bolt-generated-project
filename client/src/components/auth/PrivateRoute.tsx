import React from 'react'
    import { Route, Navigate } from 'react-router-dom'
    import axios from 'axios'

    const PrivateRoute = ({ component: Component, ...rest }) => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (!token || !user) {
        return <Navigate to="/login" />
      }

      return <Route {...rest} element={<Component />} />
    }

    export default PrivateRoute
