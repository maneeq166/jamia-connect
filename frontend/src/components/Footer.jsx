import React, { useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const linkClass =
    "relative text-white/80 hover:text-[#DFF09E] transition-colors duration-300 w-fit group/link text-[15px]";
  
  const socialClass =
    "w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-[#809D3C] hover:border-[#809D3C] transition-all duration-300 shadow-sm";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Outer wrapper to provide the deep heritage background and padding for the floating footer */}
      <div className="relative w-full bg-gradient-to-br from-[#1E2C12] via-[#243616] to-[#1E2C12] pt-20 pb-8 px-4 sm:px-6 lg:px-8 font-plex overflow-hidden selection:bg-[#DFF09E] selection:text-[#1E2C12]">
        
        {/* Absolute Depth Glow Behind Footer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[rgba(129,157,60,0.15)] blur-[120px] rounded-full pointer-events-none z-0" />

        <motion.footer
          ref={footerRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group/footer relative z-10 max-w-7xl mx-auto mb-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-all duration-400 overflow-hidden"
        >
          {/* Heritage Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#809D3C] via-[#FFB84D] to-[#809D3C] opacity-50" />

          {/* Mouse Follow Spotlight */}
          <div
            className="pointer-events-none absolute -inset-px z-0 opacity-0 group-hover/footer:opacity-100 transition-opacity duration-500 mix-blend-overlay"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.18), transparent 40%)`,
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 lg:gap-20">
            
            {/* Logo Section */}
            <div className="flex flex-col items-start gap-5 flex-1">
              <div
                onClick={() => navigate("/")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("/")}
                className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center text-white font-fraunces font-bold text-2xl shadow-sm hover:scale-105 hover:shadow-lg hover:bg-white/30 transition-all duration-300 cursor-pointer"
              >
                JC
              </div>
              <p className="text-white/80 text-[15px] font-light leading-relaxed max-w-sm">
                Jamia’s digital campus for connection and knowledge. Access past year papers, official notices, and explore university resources.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="flex flex-col gap-4 flex-1 md:items-center">
              <div className="flex flex-col gap-3">
                <h3 className="font-fraunces text-xl font-medium text-white mb-2 tracking-wide">
                  Directory
                </h3>
                <Link to="/boards" className={linkClass}>
                  Discussion Boards
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#DFF09E] scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                </Link>
                <Link to="/pyq-material" className={linkClass}>
                  Study Materials (PYQs)
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#DFF09E] scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                </Link>
                <Link to="/jmi-notices" className={linkClass}>
                  Official Notices
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#DFF09E] scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                </Link>
                <Link to="/explore" className={linkClass}>
                  Campus Network
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#DFF09E] scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                </Link>
              </div>
            </div>

            {/* Social Section */}
            <div className="flex flex-col gap-4 flex-1 md:items-end">
              <div className="flex flex-col gap-4">
                <h3 className="font-fraunces text-xl font-medium text-white mb-1 tracking-wide">
                  Connect
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://x.com/MohammadAn62616"
                    target="_blank"
                    rel="noreferrer"
                    className={socialClass}
                    aria-label="Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/an33q._/"
                    target="_blank"
                    rel="noreferrer"
                    className={socialClass}
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mohammad-aneeq/"
                    target="_blank"
                    rel="noreferrer"
                    className={socialClass}
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="relative z-10 border-t border-white/10 mt-14 pt-8 text-center">
            <p className="font-mono text-sm text-white/60 tracking-wider">
              © {new Date().getFullYear()} JAMIA CONNECT. ALL RIGHTS RESERVED.
            </p>
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default Footer;