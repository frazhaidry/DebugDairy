import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, allow access to the child component(s)
  return children;
};

export default ProtectedRoute;
