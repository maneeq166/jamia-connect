import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { ArrowDown } from "lucide-react";
import BACKEND_URL from "../../config/backend_url";

const BlogIndex = () => {
  const nav = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/blog/get-all-blogs`
      );

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

  const updateUpVote = async (blogId) => {
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/api/v1/blog/add-vote`,
        { blogId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === blogId
              ? {
                  ...b,
                  upVote: res.data.upvoters,
                  downVote: res.data.downvoters,
                }
              : b
          )
        );
      }
      fetchBlogs();
    } catch {
      toast.error("Upvote failed");
    }
  };

  const updateDownVote = async (blogId) => {
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/api/v1/blog/remove-vote`,
        { blogId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === blogId
              ? {
                  ...b,
                  downVote: res.data.downvoters,
                  upVote: res.data.upvoters,
                }
              : b
          )
        );
      }
      fetchBlogs();
    } catch {
      toast.error("Downvote failed");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <Button
        onClick={() => nav("/board/add-board")}
        className="mb-4 px-3 text-sm py-2 "
      >
        Create a board
      </Button>
      <h1 className="text-4xl font-bold text-center mb-8 text-jmi-600">
        /JMI Board/
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
              className="bg-jmi-300 p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              <div className="flex justify-between">
                {blog.image?.url && (
                  <img
                    src={blog.image.url}
                    alt={blog.title}
                    className="w-50 h-50 object-cover rounded-md mb-4"
                  />
                )}
                <div className="flex ">
                  <div className="flex">
                    <div className="flex flex-col mr-1">
                      <p className="mb-4 mt-2">{blog.upVote?.length || 0}</p>
                      <p>{blog.downVote?.length || 0}</p>
                    </div>
                    <div className="flex flex-col ">
                      <div className="bg-jmi-400 p-2  rounded-2xl ">
                        <ArrowUp
                          className="hover:text-jmi-700"
                          onClick={() => updateUpVote(blog._id)}
                        />
                      </div>
                      <div className="bg-jmi-400 p-2  rounded-2xl ">
                        <ArrowDown
                          className="hover:text-jmi-700"
                          onClick={() => updateDownVote(blog._id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h2
                onClick={() => nav(`/blog/${blog._id}`)}
                className="text-xl hover:cursor-pointer hover:text-jmi-500 font-semibold text-jmi-700 mb-2"
              >
                {blog.title}
              </h2>
              <p className="text-gray-600 text-xs mb-2">
                <span className="font-semibold">By:</span> {blog.username}
              </p>
              <p className="text-gray-700 text-[14px]">
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
