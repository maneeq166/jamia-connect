import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import BACKEND_URL from "../../config/backend_url";
import { Search, X } from "lucide-react";

const UserRow = ({ user, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group"
    >
      {/* Desktop Card */}
      <div
        className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/60 backdrop-blur-md border border-[#E9F5D0] rounded-xl mb-3 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-[3px] hover:bg-white/80 transition-all duration-300 cursor-pointer items-center"
        onClick={() => navigate(`/user/${user.username}`)}
      >
        <div className="col-span-1 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[#809D3C]/20 blur-md rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src={
              user?.avatar?.url ||
              "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            }
            alt={`${user.username}'s avatar`}
            className="w-12 h-12 rounded-full object-cover relative z-10 border-2 border-transparent group-hover:border-[#DFF09E] transition-colors"
          />
        </div>

        <div className="col-span-4 ml-6 text-base font-semibold text-[#1E2C12] group-hover:text-[#5D8736] transition-colors flex items-center tracking-tight">
          {user.username}
        </div>

        <div className="col-span-2 flex items-center text-[#5D8736] font-medium text-sm">
          <span className="bg-[#E9F5D0] px-3 py-1 rounded-full">{user.year || "Year N/A"}</span>
        </div>

        <div className="col-span-3 flex items-center text-[#3E5C25] text-sm">
          {user.department || "Dept. N/A"}
        </div>

        <div className="col-span-2 text-end text-[#809D3C] text-sm font-mono flex items-center justify-end">
          {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* Mobile Card */}
      <div
        className="md:hidden bg-white/60 backdrop-blur-md border border-[#E9F5D0] p-5 rounded-xl mb-3 shadow-sm active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden"
        onClick={() => navigate(`/user/${user.username}`)}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#DFF09E] rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="flex items-start gap-4 relative z-10">
          <img
            src={
              user?.avatar?.url ||
              "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            }
            alt={`${user.username}'s avatar`}
            className="w-14 h-14 rounded-full object-cover border border-[#E9F5D0]"
          />
          <div className="flex-1">
            <p className="font-semibold text-lg text-[#1E2C12] leading-tight mb-1">{user.username}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs bg-[#E9F5D0] text-[#3E5C25] px-2 py-0.5 rounded-full font-medium">
                {user.year || "N/A"}
              </span>
              <span className="text-xs bg-white text-[#5D8736] border border-[#E9F5D0] px-2 py-0.5 rounded-full font-medium truncate max-w-[150px]">
                {user.department || "N/A"}
              </span>
            </div>
            <p className="text-xs text-[#809D3C] font-mono mt-1">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function Explore() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isExactSearching, setIsExactSearching] = useState(false);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const totalPages = useRef(1);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/explore/users?page=${page}&limit=30`
      );
      setUsers(res.data.users);
      totalPages.current = res.data.totalPages;
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Could not fetch users."
      );
    } finally {
      setLoading(false);
    }
  }, [page]);

  const fetchUserBySearch = useCallback(async (term) => {
    if (!term.trim()) {
      setSearchResults(null);
      return;
    }
    setIsSearching(true);
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/explore/users/${term}`
      );
      setSearchResults(res.data.user);
    } catch {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const fetchExactUser = async (username) => {
    if (!username.trim()) {
      setSearchResults(null);
      return;
    }
    setIsExactSearching(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/explore/user/${username}`
      );
      setSearchResults(res.data.user);
    } catch {
      setSearchResults([]);
    } finally {
      setIsExactSearching(false);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      return;
    }
    const timer = setTimeout(() => {
      fetchUserBySearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchUserBySearch]);

  useEffect(() => {
    if (searchResults === null) {
      fetchUsers();
    }
  }, [page, fetchUsers, searchResults]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchExactUser(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults(null);
    setPage(1);
  };

  const usersToDisplay =
    searchResults !== null
      ? Array.isArray(searchResults)
        ? searchResults
        : searchResults
          ? [searchResults]
          : []
      : users;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate overflow-hidden selection:bg-[#DFF09E] selection:text-[#1E2C12]">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Global Depth Glow Layer */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.12),transparent_70%)] blur-[120px] pointer-events-none -z-20 opacity-80" />

      {/* --- HERO SECTION --- */}
      <section className="pt-24 pb-12 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-[#E9F5D0] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-10 md:p-16 text-center">
            
            {/* Hero Inner Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F4FFC3]/30 via-transparent to-[#DFF09E]/20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#809D3C]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <span className="font-mono text-[#809D3C] text-xs tracking-widest uppercase block">Directory</span>
              <h1 className="font-fraunces text-4xl md:text-6xl font-normal text-[#1E2C12] tracking-tight">
                Discover the Network
              </h1>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#809D3C] to-transparent mx-auto opacity-50" />
              <p className="font-plex text-lg md:text-xl text-[#5D8736] font-light max-w-2xl mx-auto leading-relaxed">
                Connect with peers, find mentors, and explore the diverse academic community of Jamia Millia Islamia.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- SEARCH SECTION --- */}
      <section className="px-6 relative z-20 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSearchSubmit} className="relative flex items-center group">
            <div className="absolute inset-0 bg-[#809D3C]/5 blur-xl rounded-2xl group-focus-within:bg-[rgba(129,157,60,0.15)] transition-colors duration-500 pointer-events-none" />
            
            <Search className="absolute left-5 text-[#809D3C] w-5 h-5 z-10" />
            
            <input
              type="text"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-4 pl-14 pr-32 bg-white/70 backdrop-blur-xl border border-[#DFF09E] rounded-2xl shadow-sm outline-none focus:border-[#809D3C] focus:ring-4 focus:ring-[#809D3C]/10 transition-all duration-300 text-[#1E2C12] font-medium placeholder:text-[#A9C46C] placeholder:font-light relative z-0"
            />

            <div className="absolute right-2 flex items-center gap-2 z-10">
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="button"
                    onClick={clearSearch}
                    className="p-2 text-[#A9C46C] hover:text-[#2F441B] hover:bg-[#E9F5D0] rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
              <button
                type="submit"
                onClick={() => fetchExactUser(searchTerm)}
                className="bg-gradient-to-r from-[#5D8736] to-[#3E5C25] text-white py-2 px-6 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-95 transition-all duration-300"
              >
                Search
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <section className="px-4 md:px-8 lg:px-16 py-12 relative z-10 mb-20">
        
        {/* Depth Layer Behind List */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[80%] bg-[rgba(129,157,60,0.15)] blur-[100px] rounded-full pointer-events-none -z-10" />

        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-6xl mx-auto relative isolate p-2 md:p-6 bg-white/40 backdrop-blur-2xl border border-[#E9F5D0] rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.05)] min-h-[500px]"
        >
          {/* Interactive Mouse Spotlight */}
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 mix-blend-overlay opacity-0 md:opacity-100 hidden md:block"
            style={{
              background: `
                radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.15) 0%, transparent 60%),
                radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,184,77,0.08) 0%, transparent 50%)
              `
            }}
          />

          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 mb-4 text-[#809D3C] font-mono text-sm tracking-wider uppercase border-b border-[#E9F5D0]">
            <div className="col-span-1 text-center">Avatar</div>
            <div className="col-span-4 ml-6">User Profile</div>
            <div className="col-span-2">Year</div>
            <div className="col-span-3">Department</div>
            <div className="col-span-2 text-end">Joined</div>
          </div>

          {/* Loader State */}
          {(loading || isSearching || isExactSearching) ? (
            <div className="flex flex-col items-center justify-center py-20 relative z-30">
              <Loader />
              <p className="mt-4 font-mono text-[#809D3C] text-sm animate-pulse">Scanning network...</p>
            </div>
          ) : (
            <div className="relative z-30 min-h-[300px]">
              <AnimatePresence mode="popLayout">
                {usersToDisplay.length > 0 ? (
                  usersToDisplay.map((user, idx) => (
                    <UserRow key={user._id || user.username} user={user} index={idx} />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-24 text-center"
                  >
                    <div className="w-16 h-16 mb-4 rounded-full bg-[#E9F5D0] flex items-center justify-center text-[#809D3C]">
                      <Search size={24} />
                    </div>
                    <h3 className="font-fraunces text-2xl text-[#2F441B] mb-2">No profiles found</h3>
                    <p className="font-plex text-[#5D8736] max-w-sm">
                      {searchResults !== null
                        ? "We couldn't find anyone matching your search criteria."
                        : "The network directory is currently empty."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* --- PAGINATION --- */}
          {!loading && !isSearching && !isExactSearching && searchResults === null && (
            <div className="mt-8 pt-6 border-t border-[#E9F5D0] flex justify-between items-center px-2 md:px-6 relative z-30">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-md border ${
                  page === 1
                    ? "bg-white/30 text-[#A9C46C] border-transparent cursor-not-allowed"
                    : "bg-white/70 text-[#2F441B] border-[#DFF09E] hover:bg-white hover:shadow-md hover:-translate-y-[1px]"
                }`}
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[#809D3C] text-sm hidden md:inline">PAGE</span>
                <span className="font-plex bg-[#F4FFC3] text-[#3E5C25] px-3 py-1 rounded-lg font-semibold border border-[#DFF09E]">
                  {page} <span className="opacity-50 mx-1">/</span> {totalPages.current}
                </span>
              </div>

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages.current))}
                disabled={page === totalPages.current}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-md border ${
                  page === totalPages.current
                    ? "bg-white/30 text-[#A9C46C] border-transparent cursor-not-allowed"
                    : "bg-white/70 text-[#2F441B] border-[#DFF09E] hover:bg-white hover:shadow-md hover:-translate-y-[1px]"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default Explore;