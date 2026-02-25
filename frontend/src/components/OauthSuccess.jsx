import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
  }, [navigate, location]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate flex items-center justify-center px-4 selection:bg-[#DFF09E] selection:text-[#1E2C12]">
        
        {/* Global Depth Glow Layer */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.15),transparent_70%)] blur-[100px] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-10 md:p-14 max-w-sm w-full text-center relative overflow-hidden"
        >
          {/* Inner ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(129,157,60,0.08),transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/50 backdrop-blur-md border border-[#DFF09E] rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Loader2 className="w-8 h-8 text-[#5D8736] animate-spin" />
            </div>
            
            <h2 className="font-fraunces text-2xl font-semibold text-[#1E2C12] tracking-tight mb-2">
              Authenticating
            </h2>
            
            <p className="text-[#5D8736] font-medium text-sm">
              Securely signing you in with Google...
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default OAuthSuccess;