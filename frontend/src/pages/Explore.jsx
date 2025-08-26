import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

// A reusable component to render a single user row to avoid code duplication.
const UserRow = ({ user }) => {
  const navigate = useNavigate();
  return (
    // UI UPDATED: Restored original even row background color and border color.
    <>
    <div
      className="hidden md:grid grid-cols-9 gap-4 px-6 py-3 odd:bg-white even:bg-jmi-300 border-b border-jmi-bg-jmi-600 transition-all hover:bg-jmi-100 cursor-pointer"
      onClick={() => navigate(`/user/${user.username}`)}
      >
      <div className="col-span-1 flex items-center justify-center">
        <img
          src={
            user?.avatar?.url ||
            "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
          }
          alt={`${user.username}'s avatar`}
          className="w-10 h-10 rounded-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div className="col-span-4 ml-10 text-[15px] font-medium text-gray-800 flex items-center underline hover:text-jmi-500">
        {user.username}
      </div>
      <div className="col-span-1 flex items-center text-gray-600">{user.year || 'N/A'}</div>
      <div className="col-span-2 flex items-center justify-center text-gray-600">
        {user.department || 'N/A'}
      </div>
      <div className="col-span-1 text-end md:pr-6 text-gray-500 flex items-center justify-end">
        {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </div>
    <div
        className="md:hidden bg-white border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => navigate(`/user/${user.username}`)}
      >
        <div className="flex items-center gap-3">
          <img
            src={
              user?.avatar?.url ||
              "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            }
            alt={`${user.username}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{user.username}</p>
            <p className="text-sm text-gray-600">Year: {user.year || "N/A"}</p>
            <p className="text-sm text-gray-600">Dept: {user.department || "N/A"}</p>
            <p className="text-xs text-gray-400">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
</>
  );
};


function Explore() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // `null` means no search has been performed. `[]` means search was performed with no results.
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isExactSearching,setIsExactSearching] = useState(false);

  const totalPages = useRef(1);
  const navigate = useNavigate();

  // Fetches the paginated list of all users.
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/explore/users?page=${page}&limit=30`
      );
      setUsers(res.data.users);
      totalPages.current = res.data.totalPages;
    } catch (error) {
      console.error("Error fetching paginated users:", error);
      toast.error(error.response?.data?.message || "Could not fetch users.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Fetches users based on the search term. Wrapped in useCallback for stability.
  const fetchUserBySearch = useCallback(async (currentSearchTerm) => {
    if (!currentSearchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/explore/users/${currentSearchTerm}`
      );
      setSearchResults(res.data.user);
    } catch (error) {
      console.log("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

 const fetchExactUser = async (username) => {
  if (!username.trim()) return;

  setIsExactSearching(true);

  try {
    const res = await axios.post(
      `http://localhost:3000/api/v1/explore/user/${username}`
    );
    setSearchResults(res.data.user);
  } catch (error) {
    console.log("Search failed:", error);
    setSearchResults([]);
  } finally {
    setIsExactSearching(false); 
  }
};


  // Effect for debounced search-as-you-type
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults(null);
      return;
    }
    const debounceTimer = setTimeout(() => {
      fetchUserBySearch(searchTerm);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, fetchUserBySearch]);

  useEffect(()=>{
    if (searchTerm.trim() === '') {
      setSearchResults(null);
      return;
    }

    fetchExactUser(searchTerm);

  },[])

  // Effect to fetch all users when the page changes, but only if we're not searching.
  useEffect(() => {
    if (searchResults === null) {
      fetchUsers();
    }
  }, [page, fetchUsers, searchResults]);

  // Handler for submitting the form manually (e.g., pressing Enter).
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUserBySearch(searchTerm);
  };
  
  // Resets the search and shows the main paginated list.
  const clearSearch = () => {
      setSearchTerm("");
      setSearchResults(null);
  }

  // Determine which list of users to display.
  const usersToDisplay = searchResults !== null ? searchResults : users;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="hidden sm:flex items-center justify-center pt-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl h-[150px] rounded-xl shadow-lg bg-gradient-to-r from-jmi-500 via-jmi-400 to-jmi-400 flex items-center justify-center px-10 text-center md:text-left"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome to Jamia Connect
            </h1>
            <p className="text-md text-jmi-100 mt-1">
              Find new people, connect, and grow your network.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-6">
        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-5">
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-4 pr-24 outline-none border-2 border-gray-200 rounded-md focus:border-jmi-400 transition-colors"
          />
          {searchTerm && (
             <button type="button" onClick={clearSearch} className="absolute mr-3 right-[88px] text-sm text-gray-500 hover:text-black p-2">
                Clear
             </button>
          )}
           <button type="submit"  oncClick={fetchExactUser} className="absolute right-2 bg-jmi-400 text-white py-2 px-4 rounded-md hover:bg-jmi-500">
              Search
           </button>
        </form>

        {/* Loading State Indicator */}
        {(loading || isSearching || isExactSearching  ) && (
          <div className="p-10 flex justify-center items-center">
            <Loader />
          </div>
        )}

        {/* User List Container */}
        {!loading && !isSearching && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-9  gap-4 px-6 py-3 bg-gradient-to-l from-[#5D8736] via-[#809D3C] to-[#A9C46C] text-white font-semibold rounded-t-md">
              <div className="col-span-1 text-center">Avatar</div>
              <div className="col-span-4 ml-10">Name</div>
              <div className="col-span-1">Year</div>
              <div className="col-span-2 text-center">Department</div>
              <div className="col-span-1 text-end md:pr-6">Joined</div>
            </div>

            {/* Data Rows */}
            {usersToDisplay.length > 0 ? (
              usersToDisplay.map((user) => (
                <UserRow key={user._id} user={user} />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                {searchResults !== null ? "No users found for your search." : "No users currently listed."}
              </div>
            )}
          </div>
        )}

        {/* Pagination Controls - only show when not displaying search results */}
        {!loading && !isSearching && searchResults === null && (
          <div className="mt-6 flex justify-between items-center px-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              // UI UPDATED: Restored original button colors.
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-jmi-text-jmi-300 text-white hover:cursor-pointer hover:bg-jmi-500"
              }`}
            >
              Previous
            </button>
            <span className="text-sm font-semibold text-gray-700">
              Page {page} of {totalPages.current}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages.current}
              // UI UPDATED: Restored original button colors.
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                page === totalPages.current
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-jmi-text-jmi-300 text-white hover:cursor-pointer hover:bg-jmi-500"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
