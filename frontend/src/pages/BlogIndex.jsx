import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


const BlogIndex = () => {
  const nav = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/blog/get-all-blogs");

      if (res.data.success) {
        setBlogs(res.data.blogs);
      } else {
        toast.info(res.data.message || "No blogs found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <Button onClick={()=>nav("/blog/add-blog")} className="px-2 text-sm py-1">Create a blog</Button>
      <h1 className="text-4xl font-bold text-center mb-8 text-jmi-600">
        All Blogs
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              {blog.image?.url && (
                <img
                  src={blog.image.url}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h2 onClick={()=>nav(`/blog/${blog._id}`)} className="text-xl hover:cursor-pointer hover:text-jmi-500 font-semibold text-jmi-700 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-semibold">By:</span> {blog.username}
              </p>
              <p className="text-gray-700 text-sm">
                {blog.content.length > 100
                  ? blog.content.substring(0, 100) + "..."
                  : blog.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogIndex;
