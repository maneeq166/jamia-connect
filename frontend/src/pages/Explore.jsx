import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Explore() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const totalPages = useRef(1);
  const nav = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/explore/users?page=${page}&limit=30`
      );
      setUsers(res.data.users);

      totalPages.current = res.data.totalPages;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/explore/user/${searchTerm}`
      );
      setSearchResult(res.data.user);
      toast.success("User Found");
      
    } catch (error) {
      console.log(error);
      toast.error("Not Found!");
    }
  };

 
  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-[900px] h-[150px] rounded-xl shadow-md bg-gradient-to-r from-[color:var(--color-jmidark)] via-[color:var(--color-jmimid)] to-[color:var(--color-jmilight)] flex items-center justify-center px-10"
        >
          <div>
            <h1 className="text-2xl font-bold text-[color:var(--color-jmipale)]">
              Welcome to Jamia Connect
            </h1>
            <p className="text-sm text-[color:var(--color-jmipale)]">
              Find new people, connect, and grow your network.
            </p>
          </div>

          {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-full bg-[color:var(--color-jmidark)] text-white font-medium shadow hover:bg-[color:var(--color-jmimid)] transition"
          >
          Explore Now
        </motion.button> */}
        </motion.div>
      </div>

      <div className="px-[100px] py-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchTerm.trim()) {
              fetchUser();
            }
          }}
        >
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-5 py-3 px-4 outline-1 outline-offset-1 outline-[color:var(--color-jmipale))] rounded-md focus-within:outline-2 focus-within:outline-[color:var(--color-jmimid))] "
          />
        </form>

        {/* Header Row */}
        <div className="grid grid-cols-9 gap-4 px-6 py-3 bg-gradient-to-l from-[#5D8736] via-[#809D3C] to-[#A9C46C] text-white font-semibold rounded-md">
          <div className="col-span-1 text-center">Avatar</div>
          <div className="col-span-4 ml-10">Name</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-2 text-center">Department</div>
          <div className="col-span-1 text-end md:pr-6">Created At</div>
        </div>

          {searchResult ? (
            <div
              key={searchResult._id}
              className="grid grid-cols-9 gap-4 px-6 py-3 odd:bg-white even:bg-[color:var(--color-jmipale)] border-b border-[color:var(--color-jmipale)]  transition-all"
            >
              <div className="col-span-1 text-center">
                <img
                  src={
                    searchResult?.avatar?.url ||
                    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  }
                  alt="avatar"
                  onClick={() => nav(`/user/${searchResult.username}`)}
                  className="w-9 h-9 rounded-full mx-auto hover:scale-105 transition-transform cursor-pointer"
                />
              </div>

              <div
                onClick={() => nav(`/user/${searchResult.username}`)}
                className="col-span-4 ml-10 text-[15px] underline hover:text-[color:var(--color-jmimid))] cursor-pointer"
              >
                {searchResult.username}
              </div>

              <div className="col-span-1 flex items-center">{searchResult.year}</div>
              <div className="col-span-2 text-center flex items-center justify-center">
                {searchResult.department}
              </div>
              <div className="col-span-1 text-end md:pr-6 text-gray-500 flex items-center justify-end">
                {new Date(searchResult.createdAt).toLocaleDateString()}
              </div>
            </div>
          
          ) : users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={user._id || index}
              className="grid grid-cols-9 gap-4 px-6 py-3 odd:bg-white even:bg-[color:var(--color-jmipale)] border-b border-[color:var(--color-jmipale)]  transition-all"
            >
              <div className="col-span-1 text-center">
                <img
                  src={
                    user?.avatar?.url ||
                    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  }
                  alt="avatar"
                  onClick={() => nav(`/user/${user.username}`)}
                  className="w-9 h-9 rounded-full mx-auto hover:scale-105 transition-transform cursor-pointer"
                />
              </div>

              <div
                onClick={() => nav(`/user/${user.username}`)}
                className="col-span-4 ml-10 text-[15px] underline hover:text-[color:var(--color-jmimid))] cursor-pointer"
              >
                {user.username}
              </div>

              <div className="col-span-1 flex items-center">{user.year}</div>
              <div className="col-span-2 text-center flex items-center justify-center">
                {user.department}
              </div>
              <div className="col-span-1 text-end md:pr-6 text-gray-500 flex items-center justify-end">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">No users found.</div>
        )}

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center px-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : " bg-[color:var(--color-jmimid))] text-white hover:cursor-pointer  hover:bg-[color:var(--color-jmidark))] "
            }`}
          >
            Previous
          </button>

          <span className="text-sm font-semibold text-gray-700">
            Page {page}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages.current}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : " bg-[color:var(--color-jmimid))] text-white hover:cursor-pointer  hover:bg-[color:var(--color-jmidark))] "
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Explore;



