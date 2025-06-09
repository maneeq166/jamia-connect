// ProtectedRoutes.js
import React from 'react';
import { Navigate } from 'react-router-dom';
 

function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token")
  
  console.log("Protected Routes:",token);
  

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoutes;
