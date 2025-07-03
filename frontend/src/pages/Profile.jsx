import React, { useEffect, useState } from "react";
import axios from "axios";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Profile() {
  const nav = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token does not exist');
      }

      const res = await axios.get("http://localhost:3000/api/v1/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data.user);
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, []);


  if (loading)
    return (
      <div className="absolute top-1/2 right-1/2 text-center mt-10">
        <div className="w-10 h-10 border-4 border-jmi-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );

  if (!user)
    return (
      <div className="text-center mt-10 text-red-500">
        Unable to load profile.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow p-6 sm:p-10">
      <div className="sm:flex sm:items-center sm:space-x-6 mb-8">
        <div aria-label="card-horizontal" className="flex items-center gap-x-5">
          <div className="flex-shrink-0 w-40 h-40 rounded-lg">
            <img
              src={
                  user.avatar?.url ||
                  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                alt="User Avatar"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="flex flex-col flex-1 gap-y-1">
            <h3 className="text-xl font-semibold text-jmi-500">
              Welcome, {user.username || "User"}!
            </h3>
            <p className="text-sm text-gray-500">
              Your profile information is listed below.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {user.username && (
            <ProfileRow label="Username" value={user.username} />
          )}
          {user.email && <ProfileRow label="Email" value={user.email} />}
          {user.state && <ProfileRow label="State" value={user.state} />}
          {user.department && (
            <ProfileRow label="Department" value={user.department} />
          )}
          {user.year && <ProfileRow label="Year" value={user.year} />}
          {user.bio && <ProfileRow label="Bio" value={user.bio} />}
          {user.links && user.links.length > 0 && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-jmi-500">
                Links
              </dt>
              <dd className="mt-1 text-sm text-blue-700 sm:col-span-2 sm:mt-0">
                <ul className="list-disc list-inside space-y-1">
                  {user.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-jmi-500"
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
      <Button className="h-[40px]" onClick={() => nav("/update-profile")}>
        Update User
      </Button>
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium text-jmi-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
}

export default Profile;
