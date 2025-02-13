import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.FC<any>;
  [rest: string]: any; // Allow other props
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={<Component />} />;
}

export default PrivateRoute;
