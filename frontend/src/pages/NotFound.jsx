import React, { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate flex items-center justify-center p-6 overflow-hidden selection:bg-[#DFF09E] selection:text-[#1E2C12]">
        
        {/* Global Depth Glow Layer */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.15),transparent_70%)] blur-3xl pointer-events-none -z-20 opacity-80" />

        {/* Local Card Depth Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(129,157,60,0.18)] blur-[100px] rounded-full pointer-events-none -z-10 opacity-70" />

        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="group relative w-full max-w-[600px] bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition-all duration-400 ease-out p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Mouse Follow Spotlight */}
          <div
            className="pointer-events-none absolute -inset-10 z-0 transition-opacity duration-300 mix-blend-overlay opacity-0 group-hover:opacity-100 hidden md:block"
            style={{
              background: `
                radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.18) 0%, transparent 60%),
                radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,184,77,0.12) 0%, transparent 50%)
              `
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            
            {/* 404 Number */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-[#809D3C]/20 blur-2xl -z-10 rounded-full" />
              <h1 className="font-fraunces text-6xl md:text-8xl font-bold text-[#1E2C12] tracking-tight leading-none">
                404
              </h1>
            </div>

            {/* Text Content */}
            <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-[#1E2C12] mb-3 leading-snug">
              This page isn’t in the campus directory.
            </h2>
            <p className="font-plex text-base md:text-lg text-[#5D8736] font-medium mb-10 max-w-sm mx-auto">
              The page may have moved, graduated, or never existed.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center justify-center px-8 py-3 bg-white/70 backdrop-blur-md border border-[#DFF09E]/40 rounded-full text-[#3E5C25] font-semibold hover:bg-white hover:shadow-md transition-colors duration-300 outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
                Go Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center justify-center px-8 py-3 bg-white/70 backdrop-blur-md border border-[#DFF09E]/40 rounded-full text-[#3E5C25] font-semibold hover:bg-white hover:shadow-md transition-colors duration-300 outline-none"
              >
                Take Me Home
              </motion.button>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}