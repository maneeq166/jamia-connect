import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '../auth/authContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isSignedIn, login, logout } = useAuthStore();
  // const navigate = useNavigate();
  const logoRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  // const navLinks = [
  //   { name: 'Home', href: '/' },
  //   { name: 'PYQs', href: '#' },
  //   { name: 'Forums', href: '#' },
  //   { name: 'Blogs', href: '#' },
  // ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-[#5D8736] via-[#809D3C] to-[#A9C46C] text-white sticky top-0 z-50 font-poppins shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3" ref={logoRef}>
          <div className="bg-white text-[#5D8736] w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
            JC
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Jamia Connect</h1>
            <p className="text-xs text-white/80 -mt-1">Academic Social Network</p>
          </div>
        </div>

        {/* Nav Links (Desktop) */}
        {/* <div className="hidden md:flex items-center gap-6">
          {isSignedIn &&
            navLinks.map((link, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.1 }}>
                <Link to={link.href} className="hover:underline transition duration-200">
                  {link.name}
                </Link>
              </motion.div>
            ))}
        </div> */}

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4 relative">
          {isSignedIn ? (
            <>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
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
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
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

        {/* Mobile Menu Button */}
        {/* 
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div> 
        */}
      </div>

      {/* Mobile Menu (Commented Out) */}
      {/*
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden px-6 py-4 space-y-3 bg-[#0f4f3d]"
          >
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                className="block text-white text-lg"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/20">
              {isSignedIn ? (
                <>
                  <Link to="/profile" className="block py-1">Profile</Link>
                  <button onClick={logout} className="block text-red-400 py-1">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="block py-1">Sign In</Link>
                  <Link
                    to="/signup"
                    className="block bg-white text-[#5D8736] py-2 px-4 mt-2 rounded-full font-semibold text-center shadow"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </motion.header>
  );
};

export default Header;
