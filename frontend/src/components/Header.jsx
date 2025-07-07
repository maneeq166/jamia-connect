import React, { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line no-unused-vars
import { motion ,AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';  // for hamburger & close icons
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const logoRef = useRef(null);
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Animate logo on mount
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  // Check auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsSignedIn(!!token);
  }, []);

  // const login = (token) => {
  //   localStorage.setItem('token', token);
  //   setIsSignedIn(true);
  // };

  const logout = () => {
    localStorage.removeItem('token');
    setIsSignedIn(false);
    setShowProfileDropdown(false);
    setMenuOpen(false);
    navigate("/signin")
  };

  // Close mobile menu when clicking on a link (optional)
  const handleMobileLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-[#5D8736] via-[#809D3C] to-[#A9C46C] py-1 text-white sticky top-0 z-50 font-poppins shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center h-8  gap-3" ref={logoRef}>
          <div className="bg-white text-[#5D8736] w-11 h-10 rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
            JC
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Jamia Connect</h1>
            <p className="text-xs text-white/80 -mt-1">Academic Social Network</p>
          </div>
        </div>

        {/* Desktop Nav & Buttons */}
        <div className="hidden md:flex items-center gap-6 relative">
          <div className='px-4'>
            <p className="font-semibold hover:underline hover:cursor-pointer" onClick={()=>navigate("/explore")}>Explore</p>
            </div>
          {isSignedIn ? (
            <>
              <button
                onClick={() =>{ setShowProfileDropdown(!showProfileDropdown);
                  
                }}
                className="font-semibold hover:underline"
              >
                Profile ▾
              </button>
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-12 right-0 bg-white text-black rounded-lg shadow-lg w-40 backdrop-blur-md border border-gray-200"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() =>{ setShowProfileDropdown(false);navigate("/profile")}}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <img src="" alt="" />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:underline">Sign In</Link>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="bg-white text-[#0f4f3d] px-5 py-2 rounded-full font-semibold shadow hover:shadow-lg transition duration-300"
                >
                  Join Now
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setShowProfileDropdown(false); // close profile dropdown on mobile toggle
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0f4f3d] px-6 py-4 space-y-3 overflow-hidden"
          >
            {isSignedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block text-white text-lg"
                  onClick={() => {
                    handleMobileLinkClick();
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    handleMobileLinkClick();
                  }}
                  className="block text-red-400 text-left py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="block text-white text-lg"
                  onClick={handleMobileLinkClick}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block bg-white text-[#5D8736] py-2 px-4 mt-2 rounded-full font-semibold text-center shadow"
                  onClick={handleMobileLinkClick}
                >
                  Join Now
                </Link>
              </>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
