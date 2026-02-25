import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import BACKEND_URL from "../../config/backend_url";
import { toast } from "react-toastify";
import {HovermeButton} from "../components/HovermeButton";

function ProfileRow({ label, value }) {
  return (
    <div className="group px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 bg-white/40 backdrop-blur-md rounded-xl hover:bg-white/60 hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(129,157,60,0.12)] transition-all duration-300 ease-out mb-3 border border-[#E9F5D0]/40 hover:border-[#DFF09E]/50">
      <dt className="text-sm font-medium text-[#5D8736] flex items-center group-hover:text-[#3E5C25] transition-colors">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-[#2F441B] sm:col-span-2 sm:mt-0 font-medium flex items-center">
        {value}
      </dd>
    </div>
  );
}

function OthersProfile() {
  const { username } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const profileCardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!profileCardRef.current) return;
    const rect = profileCardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/explore/user/${username}`);
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] flex justify-center items-center">
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-[rgba(129,157,60,0.3)] blur-2xl rounded-full scale-150 animate-pulse" />
          <div className="w-12 h-12 border-4 border-[#DFF09E] border-t-[#5D8736] rounded-full animate-spin relative z-10" />
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3]">
        <div className="text-center text-[#e65c5c] font-plex bg-white/60 backdrop-blur-md px-10 py-8 rounded-2xl border border-red-100 shadow-sm">
          <p className="text-lg font-medium">User profile not found.</p>
          <button onClick={() => nav("/explore")} className="mt-4 text-[#5D8736] hover:underline font-medium">Return to Directory</button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate overflow-x-hidden pt-28 pb-20 selection:bg-[#DFF09E] selection:text-[#1E2C12]">
      
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
        ref={profileCardRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto mb-16 bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 sm:p-12 relative overflow-hidden group hover:-translate-y-[3px] hover:shadow-[0_15px_50px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out"
      >
        {/* Mouse Follow Spotlight */}
        <div
          className="pointer-events-none absolute -inset-10 z-20 transition-opacity duration-300 mix-blend-overlay opacity-0 group-hover:opacity-100 hidden md:block"
          style={{
            background: `
              radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.15) 0%, transparent 60%),
              radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,184,77,0.10) 0%, transparent 50%)
            `
          }}
        />

        <div className="relative z-10">
          
          {/* Profile Header (Horizontal Layout) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 md:gap-8 mb-12">
            
            {/* Avatar Container */}
            <div className="relative flex-shrink-0 mx-auto sm:mx-0">
              {/* Background Gradient Glow */}
              <div className="absolute inset-0 bg-[rgba(129,157,60,0.18)] blur-2xl scale-110 opacity-70 -z-10 rounded-2xl" />
              
              {/* Image with Glass Ring */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white/50 backdrop-blur-lg border border-[#DFF09E]/40 shadow-lg p-1.5 group-hover:scale-105 transition-transform duration-500 ease-out">
                <img
                  src={
                    user.avatar?.url ||
                    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  }
                  alt={`${user.username}'s Avatar`}
                  className="object-cover w-full h-full rounded-xl bg-white"
                />
              </div>
            </div>

            {/* Text Section & Hoverme Button */}
            <div className="flex flex-col text-center sm:text-left justify-center relative z-30">
              <h3 className="font-fraunces text-2xl md:text-3xl font-semibold text-[#3E5C25] tracking-tight">
                {user.username}
              </h3>
              <div className="w-10 h-[2px] bg-[#A9C46C] rounded my-2 mx-auto sm:mx-0" />
              <div className="mt-2">
                <HovermeButton username={user.username} />
              </div>
            </div>
          </div>

          {/* Profile Details List */}
          <div className="pt-2">
            <dl className="space-y-1">
              {user.email && <ProfileRow label="Email" value={user.email} />}
              {user.state && <ProfileRow label="State" value={user.state} />}
              {user.department && <ProfileRow label="Department" value={user.department} />}
              {user.year && <ProfileRow label="Year" value={user.year} />}
              {user.bio && <ProfileRow label="Bio" value={user.bio} />}
              
              {user.links && user.links.length > 0 && (
                <div className="group px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 bg-white/40 backdrop-blur-md rounded-xl hover:bg-white/60 hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(129,157,60,0.12)] transition-all duration-300 ease-out border border-[#E9F5D0]/40 hover:border-[#DFF09E]/50">
                  <dt className="text-sm font-medium text-[#5D8736] flex items-center group-hover:text-[#3E5C25] transition-colors">Links</dt>
                  <dd className="mt-1 text-sm text-[#2F441B] sm:col-span-2 sm:mt-0 font-medium">
                    <ul className="flex flex-col gap-2">
                      {user.links.map((link, idx) => (
                        <li key={idx}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#5D8736] hover:text-[#3E5C25] underline underline-offset-4 transition-colors font-mono"
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
          </div>

        </div>
      </motion.div>

      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}

export default OthersProfile;