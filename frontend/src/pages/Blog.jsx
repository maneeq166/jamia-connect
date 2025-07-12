import React, { useState } from "react";

let postCounter = 1;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const addPost = () => {
    if (!content.trim()) return;
    const newPost = {
      id: postCounter++,
      content,
      timestamp: new Date().toLocaleString(),
    };
    setPosts([newPost, ...posts]);
    setContent("");
  };

  return (
    <div className="bg-neutral-100 min-h-screen p-4 font-mono">
      <div className="max-w-2xl mx-auto bg-white shadow p-4 border border-gray-300">
        <h1 className="text-xl font-bold text-green-700 mb-4">/blog/ - Anonymous Board</h1>

        {/* Post Input */}
        <div className="mb-4">
          <textarea
            className="w-full border p-2 text-sm"
            placeholder="Type your blog post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <button
            onClick={addPost}
            className="mt-2 bg-green-700 text-white px-4 py-1 text-sm hover:bg-green-800"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 p-3 bg-gray-50 text-sm text-gray-800"
            >
              <div className="text-xs text-gray-500 mb-1">
                Anonymous &nbsp; {post.timestamp} &nbsp; No.{post.id}
              </div>
              <pre className="whitespace-pre-wrap">{post.content}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
