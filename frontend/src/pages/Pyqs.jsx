import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Download, FileText } from 'lucide-react';
import Loader from '../components/BookLoader';
import BACKEND_URL from '../../config/backend_url';

const Card = ({ subject, department, year, content, pdfUrl, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 shadow-[0_10px_30px_rgba(0,0,0,0.04)] rounded-2xl p-5 h-56 flex flex-col justify-between hover:-translate-y-[6px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:border-[#A9C46C]/50 transition-all duration-300 ease-out cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,157,60,0.05),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-[#5D8736] font-mono tracking-wide uppercase bg-[#DFF09E]/30 px-2 py-0.5 rounded-md border border-[#DFF09E]/50">
            {department}
          </span>
          <div className="bg-[#DFF09E]/60 text-[#1E2C12] px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border border-[#DFF09E]">
            {year}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-[#1E2C12] leading-tight mb-2 group-hover:text-[#5D8736] transition-colors line-clamp-2">
          {subject}
        </h3>
        
        <p className="text-sm text-[#3E5C25] line-clamp-2 opacity-80 leading-relaxed font-light">
          {content}
        </p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#DFF09E]/30 mt-auto">
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#809D3C]">
          <FileText size={14} />
          <span>PDF Document</span>
        </div>
        
        <a 
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 bg-gradient-to-br from-[#809D3C] to-[#5D8736] text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Download size={16} strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  );
};

const Pyqs = () => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState();
  const nav = useNavigate();

  const getPyqOnFe = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/pyqs/get-study-material`);
      setPyqs(res.data.pyq);
      setSuccess(res.data.success);
    } catch (err) {
      console.error("Failed to fetch PYQs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPyqOnFe();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate selection:bg-[#DFF09E] selection:text-[#1E2C12] pt-24 pb-16">
        
        {/* Global Depth Glow */}
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.12),transparent_70%)] blur-[100px] pointer-events-none -z-10 opacity-70" />

        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header & Upload Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-center sm:text-left">
              <h1 className="font-fraunces text-3xl md:text-4xl font-semibold text-[#1E2C12] mb-1">Study Materials</h1>
              <p className="font-mono text-sm text-[#809D3C]">Past Year Question Papers</p>
            </div>
            
            <button 
              onClick={() => nav("/upload-pyq")} 
              className="group flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-[#DFF09E]/60 text-[#2F441B] px-6 py-2.5 rounded-full shadow-sm hover:bg-white hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 font-medium text-sm outline-none"
            >
              <UploadCloud size={18} className="text-[#5D8736] group-hover:-translate-y-0.5 transition-transform" />
              Upload Material
            </button>
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex justify-center items-center min-h-[60vh] relative"
              >
                <div className="absolute inset-0 bg-[#809D3C] blur-3xl opacity-10 rounded-full scale-150 animate-pulse pointer-events-none" />
                <Loader />
              </motion.div>
            ) : pyqs?.length > 0 ? (
              <motion.div 
                key="grid"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10"
              >
                {pyqs.map((pyq, index) => (
                  <Card
                    key={pyq._id || index}
                    index={index}
                    subject={pyq.subject}
                    content={pyq.content}
                    department={pyq.department}
                    year={pyq.year}
                    pdfUrl={pyq.url.url} 
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[50vh] text-center"
              >
                <div className="w-20 h-20 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-[#DFF09E] shadow-sm">
                  <FileText size={32} className="text-[#809D3C]" />
                </div>
                <h3 className="font-fraunces text-2xl font-semibold text-[#2F441B] mb-2">No study material available yet</h3>
                <p className="font-plex text-[#5D8736] text-sm max-w-sm">Be the first to contribute to the community by uploading a past year question paper.</p>
                <button 
                  onClick={() => nav("/upload-pyq")} 
                  className="mt-6 bg-gradient-to-r from-[#809D3C] to-[#5D8736] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all text-sm"
                >
                  Upload First PDF
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
};

export default Pyqs;