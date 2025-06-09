// ProtectedRoutes.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../auth/authContext';

function ProtectedRoutes({ children }) {
  const isSignedIn = useAuthStore(state => state.isSignedIn);
  console.log("isSignedIn:",isSignedIn);

  if (!isSignedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoutes;
