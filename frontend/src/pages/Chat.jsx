import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Loader from "../components/Loader";

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

      const res = await axios.get("http://localhost:3000/api/v1/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data?.message || error.message);
    }
  };

  // Load chat messages between sender and receiver
  const loadMessages = async () => {
    try {
      if (!user || !username) return;

      const res = await axios.post("http://localhost:3000/api/v1/chat/getmessage", {
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

    socket.current = io("http://localhost:3000", {
      auth: { token },
    });

    socket.current.on("receive message", (msg) => {
  console.log("Socket message received:", msg);
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
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jmi-400 flex items-center justify-center p-4">
      <div className="w-full max-w-full min-h-screen bg-jmi-600 rounded-2xl shadow-lg flex flex-col border border-jmi-500 overflow-hidden">
        {/* Header */}
        <div className="bg-jmi-700 p-4 text-white font-semibold text-lg border-b border-jmi-500">
          {username}
        </div>

        {/* Messages */}
        {user && (
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {messages.map((msg, index) => {
              const isSender = msg.sender?.username === user?.username;
              console.log(isSender,":",msg);
              

              return (
                <div key={index} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-xl shadow-sm text-sm ${
                      isSender
                        ? "bg-jmi-800 text-white rounded-br-none"
                        : "bg-white text-jmi-700 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-jmi-700 border-t border-jmi-500 flex items-center"
        >
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-jmi-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-jmi-800 bg-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-jmi-800 text-white px-5 py-2 rounded-full hover:bg-orange-400 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
