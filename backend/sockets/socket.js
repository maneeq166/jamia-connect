const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const User = require("../models/User");

function initSocket(io) {
  io.on("connection", async (socket) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        console.log("No token provided.");
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const username = decoded.username;

      if (!username) {
        console.log("Invalid token - username missing.");
        return;
      }

      socket.join(username); // Join the user to their own room
      console.log(`${username} joined their room`);
    } catch (err) {
      console.error("Socket auth error:", err.message);
      return;
    }

    // Handle incoming message
    socket.on("send message", async (chat) => {
      try {
        const { sender, receiver, content } = chat;

        const senderUser = await User.findOne({ username: sender });
        const receiverUser = await User.findOne({ username: receiver });

        if (!senderUser || !receiverUser) {
          console.log("Sender or receiver not found");
          return;
        }

        const savedMsg = await Message.create({
          sender: senderUser._id,
          receiver: receiverUser._id,
          content,
        });

        const fullMsg = await Message.findById(savedMsg._id)
          .populate("sender", "username")
          .populate("receiver", "username");

        // ✅ Emit message only to sender and receiver
        io.to(sender).emit("receive message", fullMsg);
        io.to(receiver).emit("receive message", fullMsg);

        console.log(`Message sent to ${sender} and ${receiver}`);
      } catch (err) {
        console.error("Error sending message via socket:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });
}

module.exports = { initSocket };
