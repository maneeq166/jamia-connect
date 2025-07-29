// pages/OAuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Import useLocation
import { toast } from 'react-toastify';

function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation(); // 2. Get the location object from the hook

  useEffect(() => {
    // 3. Use location.search, which is guaranteed to be correct
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');

    

    if (token) {
      try {
        localStorage.setItem('token', token);
        navigate('/profile');
      } catch (error) {
        console.error("Error in OAuthSuccess:", error);
        toast.error("Something went wrong while saving the session.");
        navigate('/signin');
      }
    } else {
      toast.error("Authentication failed. No token received.");
      navigate('/signin');
    }
    // 4. Add location to the dependency array
  }, [navigate, location]);

  return <p>Signing in with Google...</p>;
}

export default OAuthSuccess;