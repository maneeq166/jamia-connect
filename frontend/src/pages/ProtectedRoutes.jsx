// ProtectedRoutes.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../../config/backend_url';
import Loader from '../components/Loader';

function ProtectedRoutes({ children }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${BACKEND_URL}/api/v1/profile/me`)
      .then(() => {
        if (isMounted) setStatus('authed');
      })
      .catch(() => {
        if (isMounted) setStatus('guest');
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (status === 'guest') {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoutes;
