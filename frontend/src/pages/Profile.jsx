import React, { useEffect, useState } from "react";
import axios from "axios";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Profile() {
  const nav = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [pyqs, setPyqs] = useState();
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token does not exist");
        }

        const res = await axios.get("http://localhost:3000/api/v1/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
        setPyqs(res.data.pyqs);
        setBlogs(res.data.blogs);
        console.log(pyqs);
        // console.log(res.data.pyqs);
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
    <>
      <div className="max-w-4xl mb-4 mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow p-6 sm:p-10">
        <div className="sm:flex sm:items-center sm:space-x-6 mb-8">
          <div
            aria-label="card-horizontal"
            className="flex relative items-center gap-x-5"
          >
            <div className="relative w-40 bg-amber-400 h-40 rounded-lg overflow-hidden">
              {/* Profile Image */}
              <img
                src={
                  user.avatar?.url ||
                  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                alt="User Avatar"
                className="object-cover  w-full h-full rounded-lg"
              />
            </div>

            {/* File Upload Input (Hidden) */}
            <input
              id="pfpInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const formData = new FormData();
                formData.append("image", file);

                try {
                  const token = localStorage.getItem("token");
                  await axios.patch(
                    "http://localhost:3000/api/v1/profile/avatar",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  alert("Profile picture updated!");
                  window.location.reload(); // Or refetch user
                } catch (err) {
                  console.error("Upload error:", err);
                  alert("Failed to upload image");
                }
              }}
            />

            {/* Edit Button Overlay */}
            <label
              htmlFor="pfpInput"
              className="absolute top-36 left-36 size-6 p-1 bg-jmi-400 rounded-full shadow-md cursor-pointer"
            >
              <img
                src="https://www.svgrepo.com/show/130377/pencil.svg"
                alt="edit"
                className="w-full h-full"
              />
            </label>

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
                <dt className="text-sm font-medium text-jmi-500">Links</dt>
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
        <Button
          className="h-[30px] px-6 py-1"
          onClick={() => nav("/update-profile")}
        >
          Update User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-10">
        {/* Blogs Card */}
        <div className="bg-jmi-100 border border-jmi-300 rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-jmi-600 mb-3">
            Your Blogs ({blogs?.length || 0})
          </h2>

          {blogs && blogs.length > 0 ? (
            <ul className="space-y-3">
              {blogs.map((blog, id) => (
                <li
                  key={id}
                  className="bg-white border border-jmi-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-jmi-700 font-medium">{blog.title}</p>
                  <p className="text-sm text-gray-600">
                    Upvotes: {blog.upVote.length} &nbsp; | &nbsp; Downvotes:{" "}
                    {blog.downVote.length}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No blogs found</p>
          )}
        </div>

        {/* PYQs Card */}
        <div className="bg-jmi-100 border border-jmi-300 rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-jmi-600 mb-3">
            Your PYQs ({pyqs?.length || 0})
          </h2>

          {pyqs && pyqs.length > 0 ? (
            <ul className="space-y-3">
              {pyqs.map((pyq, id) => (
                <li
                  key={id}
                  className="bg-white border border-jmi-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-jmi-700 font-medium">{pyq.subject}</p>
                  <p className="text-sm text-gray-600">
                    Year: {pyq.year} <br />
                    Department: {pyq.department}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No PYQs found</p>
          )}
        </div>
      </div>

      <Footer/>
    </>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium text-jmi-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
}

export default Profile;
