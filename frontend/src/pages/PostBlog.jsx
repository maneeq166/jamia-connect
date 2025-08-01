import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Blog = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  async function blogSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/v1/blog/add-blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // ✅ Important
          },
        }
      );

      if (res?.data?.success) {
        toast.success(res.data.message || "Blog Posted!", {
          icon: "✅",
          style: {
            background: "var(--color-jmi-100)",
            color: "var(--color-jmi-900)",
            fontWeight: "bold",
            fontSize: "14px",
          },
          progressStyle: {
            background: "var(--color-jmi-500)",
          },
        });

        // Reset form
        setTitle("");
        setContent("");
        setImagePreview(null);
        setImageFile(null);
      } else {
        toast.error(res.data.message || "Something went wrong!", {
          style: {
            background: "var(--color-jmi-100)",
            color: "var(--color-jmi-900)",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        style: {
          background: "var(--color-jmi-100)",
          color: "var(--color-jmi-900)",
        },
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-8">
      <div className="rounded-2xl shadow-2xl w-full max-w-3xl p-8 space-y-6 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-jmi-400 via-jmi-600 to-jmi-600 bg-clip-text text-transparent">
            Write your Board
          </h1>
          <button
            onClick={blogSubmit}
            className="bg-jmi-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-jmi-500 cursor-pointer"
          >
            Publish
          </button>
        </div>

        {imagePreview && (
          <div className="w-full">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded-xl border border-jmi-300"
            />
          </div>
        )}

        <form className="space-y-5" onSubmit={blogSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-md text-jmi-700 font-semibold mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Create Title for your amazing Board"
              className="w-full px-4 py-2 border border-jmi-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jmi-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm text-jmi-700 font-semibold mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              placeholder="Write your Board content here..."
              rows="6"
              className="w-full px-4 py-2 border border-jmi-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jmi-600"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-xs text-jmi-700 font-semibold mb-1"
            >
              Upload Cover Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-jmi-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-jmi-600 file:text-white hover:file:bg-jmi-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blog;
