import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, Plus, Loader2, Link as LinkIcon } from "lucide-react";
import BACKEND_URL from "../../config/backend_url";

function ProfileRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="group bg-white/50 backdrop-blur-md rounded-xl border border-[#E9F5D0]/40 px-6 py-5 shadow-sm hover:shadow-[0_8px_30px_rgba(129,157,60,0.08)] hover:-translate-y-[2px] transition-all duration-300 ease-out mb-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
      <dt className="text-sm font-medium text-[#5D8736] sm:w-1/3 shrink-0 flex items-center group-hover:text-[#3E5C25] transition-colors">
        {label}
      </dt>
      <dd className="text-base text-[#1E2C12] font-medium break-all sm:w-2/3">
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
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const res = await axios.get(`${BACKEND_URL}/api/v1/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
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
    else if (username.length < 3) errors.username = "Username must be at least 3 characters";

    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";

    if (year && (!/^\d+$/.test(year) || year < 1 || year > 5)) {
      errors.year = "Year must be between 1 and 5";
    }

    links.forEach((link, index) => {
      if (link.trim() && !/^https?:\/\/.+\..+/.test(link)) {
        errors[`link_${index}`] = "Invalid URL format";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BACKEND_URL}/api/v1/profile/update`,
        {
          ...formData,
          year: parseInt(formData.year) || undefined,
          links: formData.links.filter((link) => link.trim() !== ""),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setValidationErrors({});
      setTimeout(() => nav("/profile"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] flex justify-center items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#809D3C] blur-2xl opacity-30 rounded-full scale-150 animate-pulse" />
          <Loader2 className="w-12 h-12 text-[#5D8736] animate-spin relative z-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex relative isolate pt-28 pb-20 px-4 selection:bg-[#DFF09E] selection:text-[#1E2C12]">
        
        {/* Global Depth Glow */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(129,157,60,0.18),transparent_70%)] blur-[120px] pointer-events-none -z-20 opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 md:p-12 hover:-translate-y-[2px] transition-transform duration-500 relative overflow-hidden"
        >
          {/* Subtle Top Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-[#1E2C12] tracking-tight">
                Update Profile
              </h2>
              <div className="w-12 h-1 bg-[#A9C46C] rounded-full mt-3 opacity-80" />
            </div>

            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="group flex items-center gap-2 bg-white/70 backdrop-blur-md border border-[#DFF09E]/40 rounded-full px-5 py-2.5 shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 outline-none text-[#5D8736] font-medium text-sm"
              >
                <Edit2 size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                Edit Details
              </motion.button>
            )}
          </div>

          {/* Status Messages */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 bg-[#DFF09E]/40 backdrop-blur-md text-[#3E5C25] px-6 py-3 rounded-xl border border-[#A9C46C]/30 font-medium text-sm text-center shadow-sm"
              >
                {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 bg-red-100/60 backdrop-blur-md text-red-700 px-6 py-3 rounded-xl border border-red-200 font-medium text-sm text-center shadow-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Username */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-[#5D8736] ml-1">Username</label>
                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full bg-white/70 backdrop-blur-md border rounded-xl px-4 py-3 text-[#1E2C12] outline-none focus:ring-4 focus:ring-[#DFF09E]/40 focus:border-[#809D3C] hover:bg-white/90 transition-all shadow-sm ${
                          validationErrors.username ? "border-red-400 focus:ring-red-100" : "border-[#DFF09E]/60"
                        }`}
                      />
                      {validationErrors.username && (
                        <p className="text-red-500 text-xs ml-1 font-medium">{validationErrors.username}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-[#5D8736] ml-1">Email</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-white/70 backdrop-blur-md border rounded-xl px-4 py-3 text-[#1E2C12] outline-none focus:ring-4 focus:ring-[#DFF09E]/40 focus:border-[#809D3C] hover:bg-white/90 transition-all shadow-sm ${
                          validationErrors.email ? "border-red-400 focus:ring-red-100" : "border-[#DFF09E]/60"
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-xs ml-1 font-medium">{validationErrors.email}</p>
                      )}
                    </div>

                    {/* Department */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-[#5D8736] ml-1">Department</label>
                      <input
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="e.g. Computer Engineering"
                        className="w-full bg-white/70 backdrop-blur-md border border-[#DFF09E]/60 rounded-xl px-4 py-3 text-[#1E2C12] outline-none focus:ring-4 focus:ring-[#DFF09E]/40 focus:border-[#809D3C] hover:bg-white/90 transition-all shadow-sm placeholder:text-[#809D3C]/60"
                      />
                    </div>

                    {/* Year */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-[#5D8736] ml-1">Year</label>
                      <input
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="1-5"
                        className={`w-full bg-white/70 backdrop-blur-md border rounded-xl px-4 py-3 text-[#1E2C12] outline-none focus:ring-4 focus:ring-[#DFF09E]/40 focus:border-[#809D3C] hover:bg-white/90 transition-all shadow-sm placeholder:text-[#809D3C]/60 ${
                          validationErrors.year ? "border-red-400 focus:ring-red-100" : "border-[#DFF09E]/60"
                        }`}
                      />
                      {validationErrors.year && (
                        <p className="text-red-500 text-xs ml-1 font-medium">{validationErrors.year}</p>
                      )}
                    </div>
                    
                    {/* State */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-medium text-[#5D8736] ml-1">Location / State</label>
                      <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Delhi, India"
                        className="w-full bg-white/70 backdrop-blur-md border border-[#DFF09E]/60 rounded-xl px-4 py-3 text-[#1E2C12] outline-none focus:ring-4 focus:ring-[#DFF09E]/40 focus:border-[#809D3C] hover:bg-white/90 transition-all shadow-sm placeholder:text-[#809D3C]/60"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#5D8736] ml-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us a bit about yourself..."
                      rows="3"
                      className="w-full bg-white/70 backdrop-blur-md border border-[#DFF09E]/60 rounded-xl px-4 py-3 text-[#1E2C12] outline-none focus:ring-4 focus:ring-[#DFF09E]/40 focus:border-[#809D3C] hover:bg-white/90 transition-all shadow-sm placeholder:text-[#809D3C]/60 resize-y"
                    />
                  </div>

                  {/* Links Area */}
                  <div className="pt-4 border-t border-[#DFF09E]/40">
                    <label className="text-sm font-medium text-[#5D8736] ml-1 block mb-3">Portfolio / Social Links</label>
                    <div className="space-y-3">
                      {formData.links.map((link, index) => (
                        <div key={index} className="relative">
                          <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#809D3C]" />
                          <input
                            type="url"
                            value={link}
                            onChange={(e) => handleLinkChange(e, index)}
                            placeholder="https://..."
                            className={`w-full bg-white/50 backdrop-blur-sm border rounded-full pl-10 pr-4 py-2.5 font-mono text-sm text-[#1E2C12] outline-none focus:ring-2 focus:ring-[#809D3C]/30 focus:border-[#809D3C] hover:bg-white/80 transition-all shadow-sm ${
                              validationErrors[`link_${index}`] ? "border-red-400" : "border-[#DFF09E]/60"
                            }`}
                          />
                          {validationErrors[`link_${index}`] && (
                            <p className="text-red-500 text-xs ml-4 mt-1 font-medium">{validationErrors[`link_${index}`]}</p>
                          )}
                        </div>
                      ))}
                      
                      {formData.links.length < 4 && (
                        <button
                          type="button"
                          onClick={handleAddLink}
                          className="flex items-center gap-1.5 text-sm font-medium text-[#5D8736] hover:text-[#3E5C25] hover:underline px-2 transition-colors mt-2"
                        >
                          <Plus size={14} /> Add another link
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-1 border-t border-[#DFF09E]/40 pt-6">
                    <ProfileRow label="Username" value={formData.username} />
                    <ProfileRow label="Email" value={formData.email} />
                    <ProfileRow label="Department" value={formData.department} />
                    <ProfileRow label="Year" value={formData.year} />
                    <ProfileRow label="Location" value={formData.state} />
                    <ProfileRow label="Bio" value={formData.bio} />
                    {formData.links.some(link => link.trim() !== "") && (
                      <div className="group bg-white/50 backdrop-blur-md rounded-xl border border-[#E9F5D0]/40 px-6 py-5 shadow-sm hover:shadow-[0_8px_30px_rgba(129,157,60,0.08)] hover:-translate-y-[2px] transition-all duration-300 ease-out flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 mt-1">
                        <dt className="text-sm font-medium text-[#5D8736] sm:w-1/3 shrink-0 mt-1">Links</dt>
                        <dd className="sm:w-2/3">
                          <ul className="flex flex-col gap-2">
                            {formData.links.filter(l => l.trim()).map((link, index) => (
                              <li key={index}>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-[#809D3C] hover:text-[#E69A15] hover:underline underline-offset-4 transition-colors font-mono text-sm"
                                >
                                  <LinkIcon size={12} />
                                  {link}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Save Button (Only visible in edit mode) */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-6 mt-6 border-t border-[#DFF09E]/40 flex justify-end"
                >
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#809D3C] to-[#5D8736] text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-95 transition-all outline-none w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Profile
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </motion.div>
      </div>
    </>
  );
}

export default UpdateProfile;