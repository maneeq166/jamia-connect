import React, { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Send, Loader2 } from "lucide-react";
import BACKEND_URL from "../../config/backend_url";

const Blog = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [key, setKey] = useState(0); // Used to trigger reset animation
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  async function blogSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.warning("Title and content are required.");
      return;
    }

    setIsPublishing(true);
    
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/add-blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (res?.data?.success) {
        toast.success(res.data.message || "Board Published!", {
          icon: "✍️",
          style: {
            background: "#f5f3ea",
            color: "#1E2C12",
            border: "1px solid #DFF09E",
            fontWeight: "500",
            fontFamily: "IBM Plex Sans"
          },
        });

        // Trigger reset animation sequence
        setKey(prev => prev + 1);
        setTimeout(() => {
          setTitle("");
          setContent("");
          setImagePreview(null);
          setImageFile(null);
        }, 300);

      } else {
        toast.error(res.data.message || "Failed to publish.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Upload failed. File too large or session expired.");
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate pt-24 pb-20 px-4 selection:bg-[#DFF09E] selection:text-[#1E2C12] flex items-center justify-center">
        
        {/* Global Depth Layer */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.18),transparent_70%)] blur-3xl pointer-events-none -z-20 opacity-70" />

        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[720px] bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 md:p-10 relative overflow-hidden group hover:-translate-y-[3px] hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition-all duration-400 ease-out"
          >
            {/* Mouse Follow Spotlight */}
            <div
              className="pointer-events-none absolute -inset-10 z-0 transition-opacity duration-300 mix-blend-overlay opacity-0 group-hover:opacity-100 hidden md:block"
              style={{
                background: `
                  radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.15) 0%, transparent 60%),
                  radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,184,77,0.12) 0%, transparent 50%)
                `
              }}
            />

            <div className="relative z-10 flex flex-col gap-8">
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-[#E9F5D0] pb-6">
                <div>
                  <h1 className="font-fraunces text-3xl md:text-4xl font-semibold text-[#1E2C12] tracking-tight">
                    Write your Board
                  </h1>
                  <p className="text-sm font-mono text-[#5D8736] mt-1 opacity-80">Share your thoughts with Jamia.</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={blogSubmit}
                  disabled={isPublishing}
                  className="bg-gradient-to-r from-[#809D3C] to-[#5D8736] text-white px-6 py-2.5 rounded-full font-medium shadow-[0_4px_15px_rgba(129,157,60,0.3)] flex items-center gap-2 outline-none disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isPublishing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <span>Publish</span>
                      <Send size={16} className="translate-y-[1px]" />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Form Area */}
              <div className="flex flex-col gap-6">
                
                {/* Title Input */}
                <div className="relative group/title">
                  <input
                    type="text"
                    placeholder="Enter an engaging title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent text-2xl md:text-3xl font-fraunces text-[#1E2C12] placeholder:text-[#809D3C]/50 outline-none py-2"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] bg-[#DFF09E] w-full transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 h-[2px] bg-[#809D3C] w-0 group-focus-within/title:w-full transition-all duration-500 ease-out" />
                </div>

                {/* Content Textarea */}
                <div className="relative">
                  <textarea
                    placeholder="Start writing your content here..."
                    rows="8"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[220px] bg-white/40 backdrop-blur-md border border-[#E9F5D0] rounded-xl p-5 text-base text-[#2F441B] placeholder:text-[#5D8736]/60 outline-none focus:ring-2 focus:ring-[#809D3C]/30 focus:border-[#809D3C]/50 transition-all duration-300 resize-y shadow-inner"
                    required
                  />
                </div>

                {/* Image Upload Area */}
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {imagePreview ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full rounded-xl overflow-hidden shadow-lg group/img"
                      >
                        <img
                          src={imagePreview}
                          alt="Cover Preview"
                          className="w-full max-h-[300px] object-cover group-hover/img:scale-[1.02] transition-transform duration-700 ease-out"
                        />
                        <button 
                          onClick={() => { setImagePreview(null); setImageFile(null); }}
                          className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-[#e65c5c] px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:bg-white hover:scale-105 transition-all"
                        >
                          Remove
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative w-full"
                      >
                        <input
                          type="file"
                          id="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full border-2 border-dashed border-[#A9C46C]/40 bg-white/30 hover:bg-[#DFF09E]/20 rounded-xl py-10 flex flex-col items-center justify-center transition-colors duration-300">
                          <div className="w-12 h-12 bg-white/60 rounded-full flex items-center justify-center text-[#5D8736] mb-3 shadow-sm">
                            <ImagePlus size={24} />
                          </div>
                          <p className="font-medium text-[#2F441B]">Add a cover image</p>
                          <p className="text-xs font-mono text-[#809D3C] mt-1">PNG, JPG up to 1MB</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Blog;