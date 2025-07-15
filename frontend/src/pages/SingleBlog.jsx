import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null); 

  const getSingleBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/blog/get-blog/${id}`);
      if (res.data.success) {
        setBlog(res.data.blog);

      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blog.");
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, [blog]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 shadow-md bg-white rounded">

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">By:</span> {blog.username} ({blog.email})
      </p>
      <img
        src={blog.image?.url}
        alt="Blog"
        className="w-full h-64 object-cover rounded mb-6"
      />
      <p className="text-lg leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </p>
    </div>
  );
};

export default SingleBlog;
