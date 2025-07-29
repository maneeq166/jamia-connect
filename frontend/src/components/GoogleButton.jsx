// components/GoogleButton.jsx
import React from 'react';

function GoogleButton({ text }) {
  const handleGoogleLogin = () => {
    // This is the corrected URL
    window.open('http://localhost:3000/api/v1/auth/google', '_self');
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full bg-white border border-gray-300 flex items-center justify-center py-2 rounded-md hover:bg-gray-100"
    >
      <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </button>
  );
}

export default GoogleButton;