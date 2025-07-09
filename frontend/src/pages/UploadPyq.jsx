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
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Study Material</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="content"
          placeholder="Content description"
          value={formData.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Upload PDF
        </button>
      </form>

      {status && <p className="mt-4 text-center text-sm">{status}</p>}
    </div>
  );
};

export default UploadPyq;
