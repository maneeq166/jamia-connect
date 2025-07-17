import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

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

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdf) return setStatus("Please upload a PDF file.");

    const data = new FormData();
    data.append("content", formData.content);
    data.append("department", formData.department);
    data.append("year", formData.year);
    data.append("subject", formData.subject);
    data.append("pdf", pdf);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/pyqs/create-study-material", // change to your backend URL
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if using auth
          },
        }
      );

      if (response.data.success) {
        setStatus("PDF uploaded successfully!");
        nav("/pyq-material");
      } else {
        setStatus(response.data.message || "Failed to upload.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong.");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-3 py-8">
    <div className="rounded-2xl shadow-2xl w-full max-w-3xl p-8 space-y-6 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-semibold bg-gradient-to-r from-jmi-400 via-jmi-600 to-jmi-600 bg-clip-text text-transparent">
          Upload Study Material
        </h2>
        <button
          type="submit"
          form="uploadForm"
          className="bg-jmi-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-jmi-500 cursor-pointer"
        >
          Upload PDF
        </button>
      </div>

      <form
        id="uploadForm"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="content"
            className="block text-md text-jmi-700 font-semibold mb-1"
          >
            Content Description
          </label>
          <input
            type="text"
            name="content"
            placeholder="Content description"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-jmi-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jmi-600"
            required
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-md text-jmi-700 font-semibold mb-1"
          >
            Department
          </label>
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-jmi-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jmi-600"
            required
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-md text-jmi-700 font-semibold mb-1"
          >
            Year
          </label>
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-jmi-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jmi-600"
            required
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-md text-jmi-700 font-semibold mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-jmi-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jmi-600"
            required
          />
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-md text-jmi-700 font-semibold mb-1"
          >
            Upload PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-jmi-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-jmi-600 file:text-white hover:file:bg-jmi-700"
            required
          />
        </div>
      </form>

      {status && (
        <p className="mt-4 text-center text-sm text-jmi-700">{status}</p>
      )}
    </div>
  </div>
);

};

export default UploadPyq;
