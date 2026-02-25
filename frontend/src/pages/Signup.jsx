import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "../components/GoogleButton";
import BACKEND_URL from "../../config/backend_url";

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const formRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
        username,
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Signup successful!");
        navigate("/signin");
      } else {
        toast.error(res.data.message || "Signup failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="min-h-screen flex flex-col md:flex-row font-plex bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] relative isolate selection:bg-[#DFF09E] selection:text-[#1E2C12]">
        
        {/* Global Depth Glow Layer */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.18),transparent_70%)] blur-[120px] pointer-events-none z-0" />

        {/* --- LEFT PANEL: VISUAL HERITAGE --- */}
        <div 
          className="relative w-full md:w-5/12 lg:w-1/2 min-h-[40vh] md:min-h-screen bg-cover bg-center flex flex-col justify-center p-10 md:p-16 z-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')" }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,44,18,0.65)] to-[rgba(30,44,18,0.85)] z-0" />
          
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.25),transparent_60%)] blur-xl z-0 pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl text-[#f5f3ea] font-semibold tracking-tight leading-tight mb-4 drop-shadow-sm">
              Jamia Connect
            </h1>
            <p className="font-plex text-lg text-[#E9F5D0] max-w-md font-medium leading-relaxed opacity-90">
              Jamia’s digital campus for connection and knowledge.
            </p>
          </motion.div>
        </div>

        {/* --- RIGHT PANEL: GLASS FORM --- */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            ref={formRef}
            onMouseMove={handleMouseMove}
            className="group w-full max-w-[420px] bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out p-8 md:p-10 relative overflow-hidden"
          >
            {/* Interactive Spotlight */}
            <div
              className="pointer-events-none absolute -inset-10 z-0 transition-opacity duration-300 mix-blend-overlay opacity-0 group-hover:opacity-100 hidden md:block"
              style={{
                background: `
                  radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.18) 0%, transparent 60%),
                  radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,184,77,0.12) 0%, transparent 50%)
                `
              }}
            />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="font-fraunces text-3xl font-semibold text-[#1E2C12] tracking-tight">
                  Create Account
                </h2>
                <div className="w-10 h-[2px] bg-[#809D3C] mx-auto mt-4 rounded-full opacity-80" />
              </div>

              <motion.form 
                variants={staggerContainer} 
                initial="hidden" 
                animate="show" 
                onSubmit={handleSignup} 
                className="space-y-5"
              >
                <motion.div variants={staggerItem} className="flex flex-col gap-1.5">
                  <label className="font-plex text-sm font-medium text-[#5D8736] ml-1">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/70 border border-[#DFF09E] rounded-lg px-4 py-2.5 text-[#1E2C12] placeholder:text-[#5D8736]/50 outline-none focus:border-[#809D3C] focus:ring-2 focus:ring-[#DFF09E] transition-all shadow-sm hover:bg-white/90"
                    required
                  />
                </motion.div>

                <motion.div variants={staggerItem} className="flex flex-col gap-1.5">
                  <label className="font-plex text-sm font-medium text-[#5D8736] ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="student@jmi.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/70 border border-[#DFF09E] rounded-lg px-4 py-2.5 text-[#1E2C12] placeholder:text-[#5D8736]/50 outline-none focus:border-[#809D3C] focus:ring-2 focus:ring-[#DFF09E] transition-all shadow-sm hover:bg-white/90"
                    required
                  />
                </motion.div>

                <motion.div variants={staggerItem} className="flex flex-col gap-1.5 relative">
                  <label className="font-plex text-sm font-medium text-[#5D8736] ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/70 border border-[#DFF09E] rounded-lg pl-4 pr-12 py-2.5 text-[#1E2C12] placeholder:text-[#5D8736]/50 outline-none focus:border-[#809D3C] focus:ring-2 focus:ring-[#DFF09E] transition-all shadow-sm hover:bg-white/90"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5D8736] hover:text-[#3E5C25] bg-white/60 border border-[#DFF09E]/40 hover:bg-white p-1.5 rounded-full transition-colors outline-none shadow-sm"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} className="pt-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#5D8736] to-[#809D3C] text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow duration-300 outline-none focus:ring-4 focus:ring-[#DFF09E]"
                  >
                    Sign Up
                  </motion.button>
                </motion.div>
              </motion.form>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.6 }} 
                className="mt-6"
              >
                <div className="relative flex items-center py-2 mb-4">
                  <div className="flex-grow border-t border-[#DFF09E]/60"></div>
                  <span className="flex-shrink-0 mx-4 text-[#809D3C] text-xs font-mono tracking-wider uppercase">
                    Or
                  </span>
                  <div className="flex-grow border-t border-[#DFF09E]/60"></div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-md border border-[#DFF09E] rounded-xl p-1.5 shadow-sm hover:bg-white/80 transition-colors duration-300">
                  <GoogleButton text="Continue with Google" />
                </div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.7 }} 
                className="mt-8 text-center text-sm text-[#5D8736] font-medium"
              >
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/signin")}
                  className="font-semibold text-[#5D8736] hover:text-[#3E5C25] hover:underline underline-offset-4 transition-colors outline-none"
                >
                  Sign in
                </button>
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Signup;