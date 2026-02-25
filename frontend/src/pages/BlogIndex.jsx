import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BACKEND_URL from "../../config/backend_url";
import { jwtDecode } from "jwt-decode";

const BlogIndex = () => {
  const nav = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/get-all-blogs`);
      if (res.data.success) {
        setBlogs(res.data.blogs);
      } else {
        toast.info(res.data.message || "No blogs found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  const updateUpVote = async (blogId) => {
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/api/v1/blog/add-vote`,
        { blogId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === blogId
              ? {
                ...b,
                upVote: res.data.upvoters,
                downVote: res.data.downvoters,
              }
              : b
          )
        );
      }
      fetchBlogs();
    } catch {
      toast.error("Upvote failed");
    }
  };

  const updateDownVote = async (blogId) => {
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/api/v1/blog/remove-vote`,
        { blogId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === blogId
              ? {
                ...b,
                downVote: res.data.downvoters,
                upVote: res.data.upvoters,
              }
              : b
          )
        );
      }
      fetchBlogs();
    } catch {
      toast.error("Downvote failed");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate pb-20 pt-24 selection:bg-[#DFF09E] selection:text-[#1E2C12]">

        {/* Global Depth Glow Layer */}
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.15),transparent_70%)] blur-3xl pointer-events-none -z-10 opacity-70" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-[#1E2C12] tracking-tight mb-3">
              /JMI Board/
            </h1>
            <p className="font-plex text-sm text-[#5D8736] max-w-lg mx-auto">
              Student discussions, ideas, and conversations.
            </p>
          </motion.div>

          {/* Action Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex justify-start"
          >
            <button
              onClick={() => nav("/board/add-board")}
              className="group flex items-center gap-2 bg-white/60 backdrop-blur-md border border-[#DFF09E]/40 text-[#1E2C12] rounded-full px-5 py-2.5 shadow-sm hover:bg-white/80 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 font-medium text-sm outline-none"
            >
              <Plus size={16} className="text-[#5D8736] group-hover:rotate-90 transition-transform duration-300" />
              Create Board
            </button>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-20"
              >
                <div className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl p-10 shadow-sm flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-[#DFF09E] border-t-[#5D8736] rounded-full animate-spin mb-4" />
                  <p className="font-mono text-[#809D3C] text-sm animate-pulse">Loading discussions...</p>
                </div>
              </motion.div>
            ) : blogs.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-20"
              >
                <div className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl p-12 shadow-sm text-center max-w-md w-full">
                  <h3 className="font-fraunces text-2xl font-semibold text-[#1E2C12] mb-2">No discussions yet.</h3>
                  <p className="font-plex text-[#5D8736] text-sm">Be the first to start a conversation in the community.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {blogs.map((blog, index) => {
                  const isUpvoted = blog.upVote?.includes(decoded.id);

                  const isDownvoted = blog.downVote?.includes(decoded.id);

                  return (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                      className="group bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:border-[#A9C46C]/40 transition-all duration-300 ease-out flex flex-col relative overflow-hidden"
                    >
                      {/* Subtle Top Right Hover Glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(129,157,60,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Image Section */}
                      {blog.image?.url && (
                        <div className="w-full h-48 rounded-xl overflow-hidden mb-5 border border-[#E9F5D0]">
                          <img
                            src={blog.image.url}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </div>
                      )}

                      {/* Content & Vote Section */}
                      <div className="flex gap-4 flex-1">

                        {/* Text Content */}
                        <div className="flex-1 flex flex-col">
                          <h2
                            onClick={() => nav(`/blog/${blog._id}`)}
                            className="font-fraunces text-xl font-semibold text-[#1E2C12] hover:text-[#5D8736] cursor-pointer mb-1 transition-colors line-clamp-2 leading-snug"
                          >
                            {blog.title}
                          </h2>
                          <p className="font-mono text-xs text-[#5D8736] mb-3">
                            By: <span className="font-medium text-[#3E5C25]">{blog.username}</span>
                          </p>
                          <p className="font-plex text-sm text-[#3E5C25] line-clamp-3 leading-relaxed font-light mt-auto">
                            {blog.content}
                          </p>
                        </div>

                        {/* Vertical Vote Control */}
                        <div className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-md border border-[#DFF09E]/40 rounded-xl px-2 py-3 space-y-2 h-fit shadow-sm">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateUpVote(blog._id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 outline-none ${isUpvoted
                              ? "bg-[#809D3C] text-white shadow-md scale-110 ring-2 ring-white/40"
                              : "bg-[#DFF09E]/40 text-[#3E5C25] hover:bg-[#809D3C] hover:text-white"
                              }`}
                            aria-label="Upvote"
                          >
                            <ArrowUp size={18} strokeWidth={2.5} />
                          </motion.button>

                          <span className={`font-mono font-semibold text-sm transition-colors ${isUpvoted
                            ? "text-[#5D8736]"
                            : isDownvoted
                              ? "text-[#FFB84D]"
                              : "text-[#3E5C25]"
                            }`}>
                            {(blog.upVote?.length || 0) - (blog.downVote?.length || 0)}
                          </span>

                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateDownVote(blog._id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 outline-none ${isDownvoted
                              ? "bg-[#FFB84D] text-white shadow-md scale-110 ring-2 ring-white/40"
                              : "bg-[#DFF09E]/40 text-[#3E5C25] hover:bg-[#FFB84D] hover:text-white"
                              }`}
                            aria-label="Downvote"
                          >
                            <ArrowDown size={18} strokeWidth={2.5} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default BlogIndex;