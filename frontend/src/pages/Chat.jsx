import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const socket = useRef(null);
  const chatEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    socket.current.emit("send message", { text: message, sender: userId });
    setMessages((prev) => [...prev, { text: message, sender: userId }]);
    setMessage("");
  };

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("connect", () => {
      setUserId(socket.current.id);
    });

    socket.current.on("recieve message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.current.disconnect();
  }, []);

  useEffect(() => {
    // Auto scroll to bottom when new message arrives
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-jmi-400 flex items-center justify-center p-4">
      <div className="w-full max-w-full min-h-screen bg-jmi-700 rounded-2xl shadow-lg flex flex-col border border-jmi-500 overflow-hidden">
        

        {/* Message Area */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {messages.map((msg, index) => {
            const isSender = msg.sender === userId;
            return (
              <div
                key={index}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-xl shadow-sm text-sm ${
                    isSender
                      ? "bg-jmi-800 text-white rounded-br-none"
                      : "bg-white text-jmi-500 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

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
