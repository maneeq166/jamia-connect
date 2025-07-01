import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [message, setmessage] = useState("");
  const socket = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    socket.current.emit("send message", message);
    setmessage(" ");
  }


  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("connect", () => {
      console.log("user connected");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md flex flex-col">
        {/* Header */}
        <div className="p-4 border-b text-xl font-bold">Messaging App</div>

        {/* Message List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {/* Example message */}
          <div className="bg-gray-200 p-2 rounded">
            <span className="font-medium">User:</span> Hello!
          </div>
        </div>

        {/* Input */}

        <div className="p-4 border-t flex">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded px-3 py-2 mr-2"
              onChange={(e) => setmessage(e.target.value)}
            />
            <button onSubmit={(e) => setmessage(e.target.value)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
