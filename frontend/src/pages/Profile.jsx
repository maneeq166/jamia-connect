import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pen } from "lucide-react";
import Footer from "../components/Footer";
import BACKEND_URL from "../../config/backend_url";
import { toast } from "react-toastify";

function ProfileRow({ label, value }) {
  return (
    <div className="group px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 bg-white/40 backdrop-blur-md rounded-xl hover:bg-white/60 hover:shadow-[0_0_20px_rgba(129,157,60,0.12)] transition-all duration-300 ease-out mb-3 border border-transparent hover:border-[#DFF09E]/50">
      <dt className="text-sm font-medium text-[#5D8736] flex items-center group-hover:text-[#3E5C25] transition-colors">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-[#2F441B] sm:col-span-2 sm:mt-0 font-medium flex items-center">
        {value}
      </dd>
    </div>
  );
}

function Profile() {
  const nav = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [pyqs, setPyqs] = useState();
  const [blogs, setBlogs] = useState();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const profileWrapperRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!profileWrapperRef.current) return;
    const rect = profileWrapperRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token does not exist");
        }

        const res = await axios.get(`${BACKEND_URL}/api/v1/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
        setPyqs(res.data.pyqs);
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data?.message || error.message
        );
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!isAvatarOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsAvatarOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isAvatarOpen]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] flex justify-center items-center">
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-[rgba(129,157,60,0.3)] blur-2xl rounded-full scale-150 animate-pulse" />
          <div className="w-12 h-12 border-4 border-[#DFF09E] border-t-[#5D8736] rounded-full animate-spin relative z-10" />
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3]">
        <div className="text-center text-[#e65c5c] font-plex bg-white/60 backdrop-blur-md px-10 py-8 rounded-2xl border border-red-100 shadow-sm">
          <p className="text-lg font-medium">Unable to load profile.</p>
          <button onClick={() => nav("/")} className="mt-4 text-[#5D8736] hover:underline font-medium">Return Home</button>
        </div>
      </div>
    );

  const avatarUrl = user?.avatar?.url;
  const canOpenAvatar = Boolean(avatarUrl);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate overflow-x-hidden pt-28 pb-20 selection:bg-[#DFF09E] selection:text-[#1E2C12]">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Global Depth Glow Layer */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.10),transparent_70%)] blur-[100px] pointer-events-none -z-20 opacity-60" />

      {/* Depth Layer Behind Main Profile */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[rgba(129,157,60,0.18)] blur-3xl rounded-full -z-10 pointer-events-none opacity-60" />

      {/* --- MAIN PROFILE WRAPPER --- */}
      <motion.div
        ref={profileWrapperRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto mb-16 relative group"
      >
        {/* Mouse Follow Spotlight for Entire Profile Area */}
        <div
          className="pointer-events-none absolute -inset-10 z-20 transition-opacity duration-300 mix-blend-overlay opacity-0 group-hover:opacity-100 hidden md:block"
          style={{
            background: `
              radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.15) 0%, transparent 60%),
              radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,184,77,0.10) 0%, transparent 50%)
            `
          }}
        />

        {/* --- PROFILE HEADER GLASS CONTAINER --- */}
        <div className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[3px] hover:shadow-[0_15px_50px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out flex items-center gap-6 md:gap-8 mb-8 relative z-10 overflow-hidden">
          
          {/* Avatar Container */}
          <div className="relative rounded-2xl bg-white/50 backdrop-blur-lg border border-[#DFF09E]/40 shadow-lg p-1.5 flex-shrink-0">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-[rgba(129,157,60,0.18)] blur-2xl scale-110 opacity-70 -z-10 rounded-2xl" />
            
            <div
              className={`relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden ring-4 ring-white/40 hover:scale-105 transition-transform duration-500 ease-out ${canOpenAvatar ? "cursor-zoom-in" : ""}`}
              onClick={canOpenAvatar ? () => setIsAvatarOpen(true) : undefined}
              title={canOpenAvatar ? "View avatar" : undefined}
            >
              <img
                src={
                  avatarUrl ||
                  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                alt={`${user.username || "User"}'s Avatar`}
                className="object-cover w-full h-full bg-white"
              />
            </div>

            <input
              id="pfpInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const formData = new FormData();
                formData.append("image", file);

                try {
                  const toastId = toast.loading("Updating profile picture...");
                  const token = localStorage.getItem("token");
                  await axios.patch(
                    `${BACKEND_URL}/api/v1/profile/avatar`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  toast.update(toastId, { render: "Profile picture updated!", type: "success", isLoading: false, autoClose: 3000 });
                  window.location.reload(); 
                } catch (err) {
                  console.error("Upload error:", err);
                  toast.error("Failed to upload image");
                }
              }}
            />

            <label
              htmlFor="pfpInput"
              className="absolute bottom-1 right-1 w-7 h-7 bg-white/90 backdrop-blur-md border border-[#DFF09E] rounded-full shadow-md flex items-center justify-center cursor-pointer text-[#5D8736] hover:scale-110 hover:text-[#3E5C25] hover:shadow-lg transition-all duration-300 z-20"
            >
              <Pen className="w-3.5 h-3.5" />
            </label>
          </div>

          {/* Text Section */}
          <div className="ml-2 md:ml-4 flex flex-col justify-center">
            <h3 className="font-fraunces text-2xl md:text-3xl font-semibold text-[#3E5C25] tracking-tight">
              Welcome, {user.username || "Scholar"}!
            </h3>
            <div className="w-10 h-[2px] bg-[#809D3C] rounded my-2" />
            <p className="font-plex text-sm md:text-base text-[#5D8736] font-medium">
              Your academic identity on Jamia Connect.
            </p>
          </div>
        </div>

        {/* --- PROFILE DETAILS SECTION --- */}
        <div className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[3px] hover:shadow-[0_15px_50px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out relative z-10">
          <dl className="space-y-1">
            {user.username && <ProfileRow label="Username" value={user.username} />}
            {user.email && <ProfileRow label="Email" value={user.email} />}
            {user.state && <ProfileRow label="State" value={user.state} />}
            {user.department && <ProfileRow label="Department" value={user.department} />}
            {user.year && <ProfileRow label="Year" value={user.year} />}
            {user.bio && <ProfileRow label="Bio" value={user.bio} />}
            
            {user.links && user.links.length > 0 && (
              <div className="group px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 bg-white/40 backdrop-blur-md rounded-xl hover:bg-white/60 hover:shadow-[0_0_20px_rgba(129,157,60,0.12)] transition-all duration-300 ease-out border border-transparent hover:border-[#DFF09E]/50">
                <dt className="text-sm font-medium text-[#5D8736] flex items-center group-hover:text-[#3E5C25] transition-colors">Links</dt>
                <dd className="mt-1 text-sm text-[#2F441B] sm:col-span-2 sm:mt-0 font-medium">
                  <ul className="flex flex-col gap-2">
                    {user.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#5D8736] hover:text-[#E69A15] hover:underline underline-offset-4 transition-colors font-mono"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-8 flex justify-center sm:justify-start">
             <button
              onClick={() => nav("/update-profile")}
              className="bg-gradient-to-r from-[#809D3C] to-[#5D8736] text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-95 transition-all duration-300 font-plex"
            >
              Update Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- CONTENT GRIDS (Blogs & PYQs) --- */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-0">
        
        {/* Blogs Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 hover:-translate-y-[3px] transition-transform duration-500 ease-out"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-fraunces text-2xl font-semibold text-[#1E2C12]">
              Your Blogs
            </h2>
            <span className="bg-[#DFF09E] text-[#3E5C25] font-mono text-xs px-3 py-1 rounded-full font-bold">
              {blogs?.length || 0}
            </span>
          </div>

          {blogs && blogs.length > 0 ? (
            <ul className="space-y-4">
              {blogs.map((blog, id) => (
                <li
                  key={id}
                  className="group bg-white/60 backdrop-blur-md border border-[#E9F5D0] rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(129,157,60,0.12)] transition-all duration-300 cursor-pointer relative overflow-hidden"
                  onClick={() => nav(`/blog/${blog._id}`)}
                >
                  <p className="font-plex text-[#2F441B] font-semibold text-lg mb-2 group-hover:text-[#5D8736] transition-colors line-clamp-2">
                    {blog.title}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#809D3C]">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                      {blog.upVote?.length || 0}
                    </span>
                    <span className="flex items-center gap-1 opacity-70">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      {blog.downVote?.length || 0}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-32 flex items-center justify-center border-2 border-dashed border-[#E9F5D0] rounded-xl bg-white/30">
              <p className="text-[#809D3C] text-sm font-medium">No blogs published yet.</p>
            </div>
          )}
        </motion.div>

        {/* PYQs Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 hover:-translate-y-[3px] transition-transform duration-500 ease-out"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-fraunces text-2xl font-semibold text-[#1E2C12]">
              Your PYQs
            </h2>
            <span className="bg-[#DFF09E] text-[#3E5C25] font-mono text-xs px-3 py-1 rounded-full font-bold">
              {pyqs?.length || 0}
            </span>
          </div>

          {pyqs && pyqs.length > 0 ? (
            <ul className="space-y-4">
              {pyqs.map((pyq, id) => (
                <li
                  key={id}
                  className="group bg-white/60 backdrop-blur-md border border-[#E9F5D0] rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(129,157,60,0.12)] transition-all duration-300 relative overflow-hidden"
                >
                  <p className="font-plex text-[#2F441B] font-semibold text-lg mb-2 group-hover:text-[#5D8736] transition-colors truncate">
                    {pyq.subject}
                  </p>
                  <div className="flex flex-col gap-1 text-sm text-[#5D8736]">
                    <span className="font-medium bg-[#E9F5D0] w-fit px-2 py-0.5 rounded text-xs">{pyq.year}</span>
                    <span className="truncate opacity-80">{pyq.department}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-32 flex items-center justify-center border-2 border-dashed border-[#E9F5D0] rounded-xl bg-white/30">
              <p className="text-[#809D3C] text-sm font-medium">No PYQs uploaded yet.</p>
            </div>
          )}
        </motion.div>

      </div>

      <div className="mt-50 -mb-20">
        <Footer/>
      </div>

      {isAvatarOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md"
          onClick={() => setIsAvatarOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsAvatarOpen(false)}
            className="absolute top-6 right-6 bg-white/80 border border-white/60 text-[#2F441B] rounded-full w-10 h-10 shadow-lg hover:bg-white transition"
            aria-label="Close avatar"
          >
            X
          </button>
          <img
            src={avatarUrl}
            alt={`${user.username || "User"}'s Avatar large`}
            className="max-h-[70vh] max-w-[85vw] rounded-2xl shadow-2xl border border-white/50 bg-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
