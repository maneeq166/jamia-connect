import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import BACKEND_URL from '../../config/backend_url';

export default function JmiNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/scrape/scrape-jmi-all`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();        
        setNotices(data);
      } catch (err) {
        console.error("Fetching error:", err);
        setError("Could not connect to the server. Please ensure your backend is running and accessible.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = useMemo(() => {
    if (!searchTerm) {
      return notices;
    } 
    return notices.filter(notice =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notices, searchTerm]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate overflow-x-hidden selection:bg-[#DFF09E] selection:text-[#1E2C12] pb-24">
        
        {/* Global Background Depth */}
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.18),transparent_70%)] blur-[120px] pointer-events-none -z-10 opacity-50" />

        {/* Header */}
        <div className="pt-24 pb-8 px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <span className="font-mono text-[#809D3C] text-xs tracking-widest uppercase block mb-4">Official Updates</span>
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1E2C12] tracking-tight mb-4">
              Jamia Notices
            </h1>
            <p className="text-sm md:text-base font-medium text-[#5D8736] max-w-xl mx-auto">
              Search, find, and stay informed on all official circulars and updates from Jamia Millia Islamia.
            </p>
          </motion.div>
        </div>

        {/* Content Area */}
        <main className="max-w-4xl mx-auto px-6 relative z-10">
          
          {/* Premium Search Input */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-12 relative group"
          >
            <div className="absolute inset-0 bg-[#809D3C]/5 blur-xl rounded-full group-focus-within:bg-[rgba(129,157,60,0.15)] transition-colors duration-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Type to search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-full px-8 py-4 text-lg text-[#1E2C12] placeholder:text-[#809D3C] focus:outline-none focus:ring-4 focus:ring-[#DFF09E]/40 shadow-sm transition-all duration-300 relative z-10"
            />
          </motion.div>

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex justify-center items-center py-20"
              >
                <div className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl p-10 flex flex-col items-center shadow-sm">
                  <div className="w-12 h-12 border-4 border-[#DFF09E] border-t-[#5D8736] rounded-full animate-spin mb-4" />
                  <p className="font-mono text-[#809D3C] text-sm animate-pulse tracking-wide">Loading notices...</p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-red-50/80 backdrop-blur-xl border border-red-200 p-8 rounded-2xl shadow-sm text-center"
              >
                <p className="font-fraunces text-2xl text-red-700 mb-2">Error</p>
                <p className="text-red-600 font-medium">{error}</p>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                className="space-y-5"
              >
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice, index) => (                    
                    <motion.a
                      key={notice.url + index}
                      href={notice.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                      onMouseMove={handleMouseMove}
                      className="group relative block p-6 bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.10)] transition-all duration-300 overflow-hidden"
                    >
                      {/* Left Accent Bar */}
                      <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-gradient-to-b from-[#809D3C] to-[#FFB84D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                      {/* Interactive Mouse Spotlight */}
                      <div
                        className="pointer-events-none absolute -inset-px z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                        style={{
                          background: `
                            radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(129,157,60,0.18), transparent 40%),
                            radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,184,77,0.12), transparent 40%)
                          `
                        }}
                      />

                      <div className="relative z-10 pl-2">
                        {notice.date && (
                          <div className="mb-3">
                            <span className="font-mono text-[11px] font-semibold bg-[#DFF09E]/40 backdrop-blur-md px-3 py-1 rounded-full text-[#3E5C25] uppercase tracking-wider">
                              {notice.date}
                            </span>
                          </div>
                        )}
                        <h3 className="font-fraunces text-lg md:text-xl font-medium text-[#1E2C12] group-hover:text-[#5D8736] transition-colors leading-snug">
                          {notice.title}
                        </h3>
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="flex justify-center py-16"
                  >
                    <div className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl p-12 text-center shadow-sm max-w-md w-full">
                      <h3 className="font-fraunces text-2xl font-semibold text-[#1E2C12] mb-2">No notices found</h3>
                      <p className="font-plex text-[#5D8736] text-sm">Try adjusting your search terms.</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}