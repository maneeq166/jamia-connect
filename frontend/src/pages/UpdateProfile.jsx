import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../config/backend_url";


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

function UpdateProfile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    state: "",
    department: "",
    year: "",
    bio: "",
    links: [""],
  });
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
   const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User not authenticated");
    }

    const res = await axios.get(`${BACKEND_URL}/api/v1/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = res.data.user;
    setFormData({
      username: user.username || "",
      email: user.email || "",
      state: user.state || "",
      department: user.department || "",
      year: user.year?.toString() || "",
      bio: user.bio || "",
      links: user.links?.length ? user.links : [""],
    });
  } catch (err) {
    setError("Failed to load profile.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (e, index) => {
    const newLinks = [...formData.links];
    newLinks[index] = e.target.value;
    setFormData((prev) => ({ ...prev, links: newLinks }));
  };

  const handleAddLink = () => {
    if (formData.links.length < 4) {
      setFormData((prev) => ({ ...prev, links: [...prev.links, ""] }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const { username, email, year, links } = formData;

    if (!username.trim()) errors.username = "Username is required";
    else if (username.length < 3)
      errors.username = "Username must be at least 3 characters";

    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";

    if (year && (!/^\d+$/.test(year) || year < 1 || year > 5)) {
      errors.year = "Year must be a number between 1 and 5";
    }

    links.forEach((link, index) => {
      if (link.trim() && !/^https?:\/\/.+\..+/.test(link)) {
        errors[`link_${index}`] = "Invalid URL";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${BACKEND_URL}/api/v1/profile/update`,
        {
          ...formData,
          year: parseInt(formData.year) || undefined,
          links: formData.links.filter((link) => link.trim() !== ""),
        },
        {headers: {
          Authorization: `Bearer ${token}`
        }}
      );

      setSuccess("Profile updated successfully!");
      setError("");
      setIsEditing(false);
      setValidationErrors({});
      nav("/profile")
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
      setSuccess("");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow p-6 sm:p-10">

      <div className=" flex justify-between items-baseline">
        <h2 className="text-xl font-bold mb-4 text-[color:var(--color-jmidark)]">
          Update Your Profile
        </h2>

        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="h-[10px] p-3 text-xs "
          >
            ✎ Edit Profile
          </Button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-t border-gray-100"
      >
        {isEditing ? (
          <>
            {/* Username */}
            <div>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className={`w-full border px-3 py-2 rounded ${
                  validationErrors.username ? "border-red-600" : ""
                }`}
              />
              {validationErrors.username && (
                <p className="text-red-600 text-sm">
                  {validationErrors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full border px-3 py-2 rounded ${
                  validationErrors.email ? "border-red-600" : ""
                }`}
              />
              {validationErrors.email && (
                <p className="text-red-600 text-sm">{validationErrors.email}</p>
              )}
            </div>

            {/* State & Department */}
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
              className="w-full border px-3 py-2 rounded"
            />

            {/* Year */}
            <div>
              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Year"
                className={`w-full border px-3 py-2 rounded ${
                  validationErrors.year ? "border-red-600" : ""
                }`}
              />
              {validationErrors.year && (
                <p className="text-red-600 text-sm">{validationErrors.year}</p>
              )}
            </div>

            {/* Bio */}
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full border px-3 py-2 rounded"
            />

            {/* Links */}
            <div>
              <label className="text-sm font-medium text-[color:var(--color-jmidark)]">
                Links
              </label>
              <div className="space-y-2 mt-2">
                {formData.links.map((link, index) => (
                  <div key={index}>
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => handleLinkChange(e, index)}
                      className={`text-sm text-gray-700 border rounded px-3 py-1 w-full ${
                        validationErrors[`link_${index}`]
                          ? "border-red-600"
                          : ""
                      }`}
                      placeholder="https://your-link.com"
                    />
                    {validationErrors[`link_${index}`] && (
                      <p className="text-red-600 text-sm">
                        {validationErrors[`link_${index}`]}
                      </p>
                    )}
                  </div>
                ))}
                {formData.links.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    + Add another link
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <dl className="divide-y divide-gray-100">
              <ProfileRow label="Username" value={formData.username} />
              <ProfileRow label="Email" value={formData.email} />
              <ProfileRow label="State" value={formData.state} />
              <ProfileRow label="Department" value={formData.department} />
              <ProfileRow label="Year" value={formData.year} />
              <ProfileRow label="Bio" value={formData.bio} />
              {formData.links.map((link, index) => (
                <ProfileRow key={index} label="Link" value={link} />
              ))}
            </dl>
          </>
        )}

        <Button className="h-[40px] w-full" type="submit" disabled={!isEditing}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default UpdateProfile;
