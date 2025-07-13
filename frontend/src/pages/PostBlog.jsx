import React, { useState } from "react";
import Button from "../components/Button";

const Blog = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-8 ">
      <div className="rounded-2xl shadow-2xl w-full max-w-3xl p-8 space-y-6 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-jmi-300 via-jmi-500 to-jmi-600 bg-clip-text text-transparent">
            Write your Blog
          </h1>
          {/* <Button className="h-7 px-3 py-[3px]">Publish</Button> */}
          <button className="bg-jmi-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-jmi-500 cursor-pointer">Publish</button>
        </div>

        {/* 👇 Image Preview (if exists) */}
        {imagePreview && (
          <div className="w-full">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded-xl border border-jmi-300"
            />
          </div>
        )}

        <form className="space-y-5">
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
              placeholder="Create Title for your amazing blog"
              className="w-full px-4 py-2 border border-jmi-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jmi-600"
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
              placeholder="Write your blog content here..."
              rows="6"
              className="w-full px-4 py-2 border border-jmi-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jmi-600"
            ></textarea>
          </div>

          {/* 📸 Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm text-jmi-700 font-semibold mb-1"
            >
              Upload Cover Image
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
