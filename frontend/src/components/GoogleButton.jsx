import React from 'react';
import { motion } from 'framer-motion';
import BACKEND_URL from '../../config/backend_url';

function GoogleButton({ text }) {
  const handleGoogleLogin = () => {
    window.open(`${BACKEND_URL}/api/v1/auth/google`, '_self');
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-transparent hover:bg-white/60 text-[#1E2C12] font-plex font-medium transition-all duration-300 outline-none focus:ring-2 focus:ring-[#809D3C]/30"
    >
      <div className="bg-white p-1 rounded-full shadow-sm mr-3 border border-[#E9F5D0]/50 flex items-center justify-center">
        <img 
          src="https://developers.google.com/identity/images/g-logo.png" 
          alt="Google Logo" 
          className="w-4 h-4 object-contain" 
        />
      </div>
      <span className="text-sm tracking-wide">{text}</span>
    </motion.button>
  );
}

export default GoogleButton;