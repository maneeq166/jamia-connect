import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/profile/me", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">Unable to load profile.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>

      <div className="space-y-3 text-gray-800">
        {user.username && (
          <p><strong>Username:</strong> {user.username}</p>
        )}
        {user.email && (
          <p><strong>Email:</strong> {user.email}</p>
        )}
        {user.state && (
          <p><strong>State:</strong> {user.state}</p>
        )}
        {user.department && (
          <p><strong>Department:</strong> {user.department}</p>
        )}
        {user.year && (
          <p><strong>Year:</strong> {user.year}</p>
        )}
        {user.bio && (
          <p><strong>Bio:</strong> {user.bio}</p>
        )}
        {user.links && user.links.length > 0 && (
          <div>
            <strong>Links:</strong>
            <ul className="list-disc list-inside text-blue-600">
              {user.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
