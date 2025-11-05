import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ adminOnly }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAuthenticated = userInfo && userInfo.token;
  const isAdmin = userInfo && userInfo.role === 'admin';

  if (!isAuthenticated) {
    // Not authenticated, redirect to login
    return <Navigate to="/securepanel396" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Authenticated but not an admin, redirect to home or an unauthorized page
    return <Navigate to="/" replace />;
  }

  // Authenticated and authorized
  return <Outlet />;
};

export default PrivateRoute;
