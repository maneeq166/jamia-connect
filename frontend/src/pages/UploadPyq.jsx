import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2, ArrowLeft } from "lucide-react";
import BACKEND_URL from "../../config/backend_url";

const UploadPyq = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    content: "",
    department: "",
    year: "",
    subject: "",
  });
  const [pdf, setPdf] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdf) return setStatus("error:Please select a PDF file to upload.");

    setIsUploading(true);
    setStatus("");

    const data = new FormData();
    data.append("content", formData.content);
    data.append("department", formData.department);
    data.append("year", formData.year);
    data.append("subject", formData.subject);
    data.append("pdf", pdf);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/pyqs/create-study-material`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setStatus("success:Study material uploaded successfully!");
        setTimeout(() => nav("/pyq-material"), 1500);
      } else {
        setStatus(`error:${response.data.message || "Failed to upload."}`);
      }
    } catch (error) {
      console.error(error);
      setStatus("error:Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] font-plex flex items-center justify-center p-6 relative isolate selection:bg-[#DFF09E] selection:text-[#1E2C12]">
        
        {/* Depth Glow Layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(129,157,60,0.15)] blur-3xl rounded-full pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-3xl p-8 md:p-10 hover:-translate-y-[2px] transition-transform duration-500 relative overflow-hidden"
        >
          {/* Subtle top reflection */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <button 
                onClick={() => nav("/pyq-material")}
                className="mb-4 text-[#809D3C] hover:text-[#5D8736] flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                <ArrowLeft size={16} /> Back to Directory
              </button>
              <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-[#1E2C12] tracking-tight">
                Upload Material
              </h2>
              <p className="text-sm text-[#5D8736] font-medium mt-1">
                Share your academic resources with the Jamia community.
              </p>
            </div>
          </div>

          <form id="uploadForm" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Subject Input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="subject" className="text-sm font-medium text-[#5D8736] ml-1">
                  Subject / Course Name
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Data Structures"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-[#DFF09E]/60 rounded-xl text-[#1E2C12] placeholder:text-[#809D3C]/60 focus:outline-none focus:ring-2 focus:ring-[#A9C46C] focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>

              {/* Department Input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="department" className="text-sm font-medium text-[#5D8736] ml-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  placeholder="e.g. Computer Engineering"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-[#DFF09E]/60 rounded-xl text-[#1E2C12] placeholder:text-[#809D3C]/60 focus:outline-none focus:ring-2 focus:ring-[#A9C46C] focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>

              {/* Year Input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="year" className="text-sm font-medium text-[#5D8736] ml-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  name="year"
                  placeholder="e.g. 2023-24"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-[#DFF09E]/60 rounded-xl text-[#1E2C12] placeholder:text-[#809D3C]/60 focus:outline-none focus:ring-2 focus:ring-[#A9C46C] focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>

              {/* Description Input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="content" className="text-sm font-medium text-[#5D8736] ml-1">
                  Short Description
                </label>
                <input
                  type="text"
                  name="content"
                  placeholder="e.g. Mid Semester Exam"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-[#DFF09E]/60 rounded-xl text-[#1E2C12] placeholder:text-[#809D3C]/60 focus:outline-none focus:ring-2 focus:ring-[#A9C46C] focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* File Upload Area */}
            <div className="mt-4">
              <label className="text-sm font-medium text-[#5D8736] ml-1 mb-1 block">
                PDF Document
              </label>
              <div className="relative border-2 border-dashed border-[#A9C46C]/40 rounded-xl p-8 hover:bg-[#DFF09E]/20 transition-colors duration-300 group cursor-pointer bg-white/40">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  required
                />
                <div className="flex flex-col items-center justify-center text-center pointer-events-none">
                  <div className="w-12 h-12 bg-[#F4FFC3] text-[#5D8736] rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                  </div>
                  <p className="text-[#2F441B] font-medium text-base mb-1">
                    {pdf ? pdf.name : "Click or drag to upload PDF"}
                  </p>
                  <p className="text-[#809D3C] text-sm">
                    Maximum file size 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* Actions & Status */}
            <div className="pt-6 mt-4 border-t border-[#DFF09E]/40 flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex-1 w-full text-center md:text-left">
                {status && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`inline-block px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md ${
                      status.startsWith("success:") 
                        ? "bg-[#DFF09E]/60 text-[#1E2C12] border border-[#A9C46C]/30" 
                        : "bg-red-50 text-red-600 border border-red-100"
                    }`}
                  >
                    {status.split(":")[1]}
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className={`flex items-center justify-center gap-2 bg-gradient-to-r from-[#809D3C] to-[#5D8736] text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-95 transition-all outline-none w-full md:w-auto ${
                  isUploading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Publish Resource
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default UploadPyq;