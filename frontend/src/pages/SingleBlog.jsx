import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, useScroll, useSpring } from "framer-motion";
import BACKEND_URL from "../../config/backend_url";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const getSingleBlog = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/get-blog/${id}`);
      if (res.data.success) {
        setBlog(res.data.blog);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 bg-[#809D3C] blur-3xl opacity-20 rounded-full scale-150 animate-pulse pointer-events-none" />
          <div className="w-12 h-12 border-4 border-[#DFF09E] border-t-[#5D8736] rounded-full animate-spin z-10" />
          <p className="mt-4 font-mono text-sm text-[#5D8736] animate-pulse">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] flex items-center justify-center font-plex">
        <div className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 p-10 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl font-fraunces text-[#1E2C12] mb-2">Article Not Found</h2>
          <p className="text-[#5D8736]">The post you're looking for doesn't exist or was removed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#809D3C] origin-left z-50 transition-all duration-200"
        style={{ scaleX }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] relative isolate font-plex selection:bg-[#DFF09E] selection:text-[#1E2C12] overflow-hidden px-4 sm:px-6">
        
        {/* Global Depth Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(129,157,60,0.15),transparent_70%)] blur-3xl pointer-events-none -z-20" />
        
        {/* Floating Background Light */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#809D3C]/20 blur-3xl rounded-full pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto mt-24 mb-24 bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 md:p-12 lg:p-16 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500 relative z-10"
        >
          {/* Subtle Inner Highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          {/* Title Section */}
          <header className="mb-10">
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#1E2C12] tracking-tight leading-[1.15]">
              {blog.title}
            </h1>
            <div className="w-16 h-[3px] bg-[#809D3C] rounded-full mt-6 mb-8" />
            
            {/* Author Badge */}
            <div className="inline-flex items-center gap-3 bg-[#DFF09E]/40 backdrop-blur-md px-4 py-2.5 rounded-full font-mono text-sm text-[#3E5C25] border border-[#DFF09E]/60 shadow-sm">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.username)}&background=f5f3ea&color=5D8736&bold=true`}
                alt={blog.username}
                className="w-8 h-8 rounded-full border border-white/60 shadow-sm"
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-semibold text-[#1E2C12]">{blog.username}</span>
                <span className="hidden sm:inline-block text-[#809D3C]">•</span>
                <span className="opacity-80 tracking-tight">{blog.email}</span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {blog.image?.url && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full h-[700px] md:h-[800px] rounded-xl overflow-hidden border border-[#E9F5D0] shadow-md mb-12 group"
            >
              <img
                src={blog.image.url}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </motion.div>
          )}

          {/* Blog Content */}
          <article className="mt-8 text-[17px] md:text-[18px] leading-relaxed text-[#2F441B] font-plex space-y-6 whitespace-pre-wrap font-light">
            {blog.content}
          </article>
          
        </motion.div>
      </div>
    </>
  );
};

export default SingleBlog;