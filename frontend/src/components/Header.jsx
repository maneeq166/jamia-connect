import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Explore", path: "/explore" },
  { title: "PYQs", path: "/pyq-material" },
  { title: "Boards", path: "/boards" },
  { title: "Notices", path: "/jmi-notices" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    setShowProfileDropdown(false);
    setMenuOpen(false);
    navigate("/signin");
  };

  const handleMobileLinkClick = (path) => {
    setMenuOpen(false);
    if (path) navigate(path);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');
        
        .font-fraunces {
          font-family: 'Fraunces', serif;
        }
        
        .font-plex {
          font-family: 'IBM Plex Sans', sans-serif;
        }
        
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

      <div className="fixed top-5 left-0 right-0 flex justify-center z-50 pointer-events-none px-4">
        <motion.header
          initial={{ y: -60, opacity: 0, scale: 1 }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            scale: scrolled ? 0.96 : 1 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`pointer-events-auto w-full max-w-5xl relative flex flex-col items-center rounded-full backdrop-blur-xl transition-colors duration-500 border border-[#809D3C]/30 ${
            scrolled
              ? "bg-[rgba(30,44,18,0.85)] shadow-[0_15px_50px_rgba(0,0,0,0.5)]"
              : "bg-[linear-gradient(135deg,rgba(30,44,18,0.75),rgba(47,68,27,0.65))] shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Glass Edge Highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] opacity-40 rounded-t-full pointer-events-none" />

          {/* Jamia Color Light Scatter Overlay */}
          <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(129,157,60,0.35),transparent_60%)] opacity-35 blur-xl -z-10" />

          {/* Main Pill Content */}
          <div className="relative w-full px-5 py-3 flex items-center justify-between z-10">
            
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start items-center">
              <Link
                to="/"
                className="flex items-center gap-3 cursor-pointer outline-none group/logo"
                onClick={() => setMenuOpen(false)}
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-9 h-9 bg-gradient-to-br from-[#5D8736] to-[#809D3C] text-white rounded-lg shadow-md flex items-center justify-center font-fraunces font-bold text-sm"
                >
                  JC
                </motion.div>
                <span className="font-fraunces text-white text-lg font-semibold tracking-tight hidden sm:block drop-shadow-sm">
                  Jamia Connect
                </span>
              </Link>
            </div>

            {/* Center: Desktop Nav Links */}
            <div className="hidden md:flex flex-[2] justify-center items-center gap-1 lg:gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative z-10"
                  >
                    <Link
                      to={link.path}
                      className={`font-plex relative z-10 px-4 py-1.5 rounded-full text-sm md:text-base font-medium transition-colors block outline-none ${
                        isActive ? "text-[#FFB84D]" : "text-[#E9F5D0] hover:text-[#FFB84D]"
                      }`}
                    >
                      {link.title}
                    </Link>
                    {/* Glowing Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full bg-[#FFB84D]/15 border border-[#FFB84D]/40 shadow-[0_0_15px_rgba(255,184,77,0.35)] pointer-events-none -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Right: Auth / Menu Toggle */}
            <div className="flex-1 flex justify-end items-center gap-2">
              <div className="hidden md:flex items-center gap-3">
                {isSignedIn ? (
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -1 }}
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className="font-plex text-[#E9F5D0] hover:text-[#FFB84D] px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium flex items-center gap-1.5 outline-none"
                    >
                      Profile <span className="font-mono text-[10px] mt-0.5">▼</span>
                    </motion.button>
                    <AnimatePresence>
                      {showProfileDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute right-0 top-full mt-4 w-48 bg-[rgba(30,44,18,0.85)] backdrop-blur-xl border border-[#809D3C]/30 rounded-xl shadow-xl overflow-hidden origin-top-right z-50"
                        >
                          <Link
                            to="/profile"
                            className="font-plex block px-4 py-3 text-sm text-white hover:bg-[rgba(47,68,27,0.8)] transition-colors duration-200"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            My Profile
                          </Link>
                          <button
                            onClick={logout}
                            className="font-plex block w-full text-left px-4 py-3 text-sm text-[#FFB84D] hover:bg-[rgba(47,68,27,0.8)] transition-colors duration-200 border-t border-[#809D3C]/30 outline-none"
                          >
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.05, y: -1 }}>
                      <Link
                        to="/signin"
                        className="font-plex text-[#E9F5D0] hover:text-[#FFB84D] px-3 py-1.5 transition-colors duration-300 text-sm font-medium outline-none block"
                      >
                        Sign In
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Link
                        to="/signup"
                        className="font-plex bg-gradient-to-r from-[#FFB84D] to-[#E69A15] text-[#1E2C12] px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm inline-block outline-none"
                      >
                        Join Now
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    setShowProfileDropdown(false);
                  }}
                  className="text-[#E9F5D0] p-2 hover:text-[#FFB84D] transition-colors outline-none"
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Mobile Dropdown Menu (Glass System) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pointer-events-auto absolute top-[110%] left-4 right-4 bg-[rgba(30,44,18,0.85)] backdrop-blur-xl border border-[#809D3C]/30 rounded-xl shadow-xl overflow-hidden md:hidden z-40 isolate"
            >
              <nav className="flex flex-col p-3 gap-1 relative z-10">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleMobileLinkClick(link.path)}
                      className={`font-plex text-left w-full px-4 py-3 rounded-lg transition-all font-medium text-sm outline-none ${
                        isActive ? "text-[#FFB84D] bg-[#FFB84D]/10" : "text-[#E9F5D0] hover:text-[#FFB84D] hover:bg-[#FFB84D]/10"
                      }`}
                    >
                      {link.title}
                    </button>
                  );
                })}

                <div className="my-2 border-t border-[#809D3C]/30"></div>

                {isSignedIn ? (
                  <>
                    <button
                      onClick={() => handleMobileLinkClick("/profile")}
                      className="font-plex text-left w-full text-white hover:text-[#FFB84D] hover:bg-[#FFB84D]/10 px-4 py-3 rounded-lg transition-colors font-medium text-sm outline-none"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        handleMobileLinkClick();
                      }}
                      className="font-plex text-left w-full text-[#FFB84D] hover:bg-[#FFB84D]/10 px-4 py-3 rounded-lg transition-colors font-medium text-sm outline-none"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 p-1">
                    <button
                      onClick={() => handleMobileLinkClick("/signin")}
                      className="font-plex text-center w-full bg-[rgba(47,68,27,0.6)] text-[#E9F5D0] hover:text-[#FFB84D] hover:bg-[rgba(47,68,27,0.9)] px-4 py-3 rounded-lg transition-colors font-medium text-sm outline-none border border-[#809D3C]/30"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleMobileLinkClick("/signup")}
                      className="font-plex text-center w-full bg-gradient-to-r from-[#FFB84D] to-[#E69A15] text-[#1E2C12] px-4 py-3 rounded-lg font-bold shadow-md active:scale-95 transition-transform text-sm outline-none"
                    >
                      Join Now
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;