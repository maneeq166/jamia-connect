import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HovermeButton } from "../components/HovermeButton";

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
  
  if (!user) return <div className="p-6">Loading...</div>;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-jmi-300 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-jmi-400 to-jmi-300 border border-gray-200 rounded-lg shadow p-6 sm:p-10">
        <div className="sm:flex sm:items-center justify-center sm:space-x-6 mb-8">
          <div aria-label="card-horizontal" className="flex items-center  gap-x-5">
            <div className="flex-shrink-0 w-40 h-40 rounded-full">
              <img
                src={user.avatar.url  || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
                alt="User Avatar"
                className="object-cover w-full h-full rounded-full"
                />
              
            </div>
            <div className="flex flex-col flex-1  text-center gap-y-1">
              <h3 className="text-xl font-semibold text-jmi-600 hover:text-jmi-500">
              {user.username || "User"}!
              </h3>

              <HovermeButton   />
              </div>
          </div>
          
        </div>

        <div className="border-t flex justify-center  border-gray-100">
          <dl className="divide-y   divide-gray-100">
            {user.username && <ProfileRow label="Username:" value={user.username} />}
            {user.email && <ProfileRow label="Email:" value={user.email} />}
            {user.state && <ProfileRow label="State:" value={user.state} />}
            {user.department && <ProfileRow label="Department:" value={user.department} />}
            {user.year && <ProfileRow label="Year:" value={user.year} />}
            {user.bio && <ProfileRow label="Bio:" value={user.bio} />}
            {user.links && user.links.length > 0 && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-jmi-600">
                  Links:
                </dt>
                <dd className="mt-1 text-sm text-jmi-500 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc list-inside space-y-1">
                    {user.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-jmi-600"
                        >
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
      
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="px-2  py-6 sm:grid sm:grid-cols-3 sm:gap-[60px] sm:px-0">
      <dt className="text-sm font-medium text-jmi-600">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
}

export default OthersProfile;
