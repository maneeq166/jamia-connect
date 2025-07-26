// pages/OAuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/profile');
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  return <p>Signing in with Google...</p>;
}

export default OAuthSuccess;
