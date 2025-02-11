import React from 'react'
    import { Route, Redirect } from 'react-router-dom'
    import axios from 'axios'

    const PrivateRoute = ({ component: Component, ...rest }) => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (!token || !user) {
        return <Redirect to="/login" />
      }

      return <Route {...rest} render={(props) => <Component {...props} />} />
    }

    export default PrivateRoute
