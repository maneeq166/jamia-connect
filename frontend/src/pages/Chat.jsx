import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import NotFound from "./NotFound";
import BACKEND_URL from "../../config/backend_url";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const socket = useRef(null);
  const chatEndRef = useRef(null);
  const { username } = useParams();

  // Fetch user profile on mount
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const res = await axios.get(`${BACKEND_URL}/api/v1/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Load chat messages between sender and receiver
  const loadMessages = async () => {
    try {
      if (!user || !username) return;

      const res = await axios.post(`${BACKEND_URL}/api/v1/chat/getmessage`, {
        sender: user.username,
        receiver: username,
      });

      setMessages(res.data.messages || []);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  // Send message to server via socket
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const payload = {
      content: message,
      sender: user.username,
      receiver: username,
    };

    socket.current.emit("send message", payload);
    setMessage("");
  };

  // Setup socket after user is fetched
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    socket.current = io(`${BACKEND_URL}`, {
      auth: { token },
    });

    socket.current.on("receive message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [user]);

  // Fetch user on first render
  useEffect(() => {
    fetchProfile();
  }, []);

  // Load messages when user and receiver are set
  useEffect(() => {
    if (user?.username && username) {
      loadMessages();
    }
  }, [user, username]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (user.username === username) {
    return <NotFound />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background-color: #809D3C;
          border-radius: 10px;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#f7f9f3] via-[#eef4e3] to-[#f7f9f3] flex items-center justify-center p-4 font-plex relative overflow-hidden selection:bg-[#DFF09E]  selection:text-[#1E2C12]">
        
        {/* Subtle radial depth layer */}
        <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(129,157,60,0.15)] blur-[100px] rounded-full pointer-events-none z-0" />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full mt-20 max-w-4xl h-[90vh] bg-white/60 backdrop-blur-xl border border-[#DFF09E]/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col relative z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#809D3C]/90 to-[#5D8736]/90 backdrop-blur-md p-4 flex items-center gap-4 z-20">
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=${username}&background=f5f3ea&color=5D8736`}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover shadow-sm border border-white/20"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#DFF09E] border-2 border-[#5D8736] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-fraunces text-white text-lg leading-tight tracking-wide">
                {username}
              </h2>
              <span className="text-xs text-white/80 font-medium">Active</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-6 py-4 space-y-3 overflow-y-auto chat-scroll relative z-10">
            {messages.map((msg, index) => {
              const isSender =
                msg.sender === user.username ||
                msg.sender?.username === user.username;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 text-[15px] leading-relaxed ${
                      isSender
                        ? "bg-gradient-to-br from-[#809D3C] to-[#5D8736] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded-2xl rounded-br-sm"
                        : "bg-white/80 backdrop-blur-md border border-[#DFF09E]/40 text-[#2F441B] shadow-sm rounded-2xl rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-xl border-t border-[#DFF09E]/40 p-4 flex items-center gap-3 z-20"
          >
            <input
              type="text"
              autoFocus
              placeholder="Type a message..."
              className="flex-1 bg-white/80 border border-[#DFF09E] rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#809D3C]/40 shadow-sm text-[#2F441B] placeholder-[#809D3C]/60 transition-all"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#809D3C] to-[#5D8736] text-white p-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center outline-none focus:ring-2 focus:ring-[#809D3C]/40 focus:ring-offset-2 focus:ring-offset-[#f7f9f3]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="translate-x-[1px] -translate-y-[1px]"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Chat;