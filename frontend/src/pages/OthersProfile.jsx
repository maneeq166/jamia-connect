import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HovermeButton } from "../components/HovermeButton";
import Loader from "../components/Loader";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function OthersProfile() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/explore/user/${username}`
        );
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
        toast.error("Server Error");
      }
    };

    if (username) fetchUser();
  }, [username]);

  if (!user)
    return (
      <div className="p-6 flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#d8f8db] to-jmi-300 py-10 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-2xl mx-auto bg-gradient-to-br from-jmi-300 to-jmi-500 border border-gray-200 rounded-lg shadow p-6 sm:p-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="sm:flex sm:items-center justify-center sm:space-x-6 mb-8">
          <motion.div
            className="flex items-center gap-x-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="flex-shrink-0 w-40 h-40 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img
                src={
                  user?.avatar?.url ||
                  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                alt="User Avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </motion.div>

            <div className="flex flex-col flex-1 text-center gap-y-1">
              <motion.h3
                className="text-xl font-semibold text-jmi-500 hover:text-jmi-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {user.username || "User"}!
              </motion.h3>
              <HovermeButton username={username} />
            </div>
          </motion.div>
        </div>

        <div className="border-t flex justify-center border-gray-100">
          <motion.dl
            className="divide-y divide-gray-100"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {user.username && <ProfileRow label="Username:" value={user.username} />}
            {user.email && <ProfileRow label="Email:" value={user.email} />}
            {user.state && <ProfileRow label="State:" value={user.state} />}
            {user.department && <ProfileRow label="Department:" value={user.department} />}
            {user.year && <ProfileRow label="Year:" value={user.year} />}
            {user.bio && <ProfileRow label="Bio:" value={user.bio} />}
            {user.links && user.links.length > 0 && (
              <motion.div
                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                variants={itemVariant}
              >
                <dt className="text-sm font-medium text-jmi-500">Links:</dt>
                <dd className="mt-1 text-sm text-jmi-500 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc list-inside space-y-1">
                    {user.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-jmi-300 text-jmi-600"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </motion.div>
            )}
          </motion.dl>
        </div>
      </motion.div>
    </motion.div>
  );
}

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function ProfileRow({ label, value }) {
  return (
    <motion.div
      className="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-[60px] sm:px-0"
      variants={itemVariant}
    >
      <dt className="text-sm font-medium text-jmi-600">{label}</dt>
      <dd className="mt-1 text-sm text-jmi-700 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </motion.div>
  );
}

export default OthersProfile;
