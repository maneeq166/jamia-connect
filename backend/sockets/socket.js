const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const User = require("../models/User");
const logger = require("../utils/logger");

function initSocket(io) {
  io.on("connection", async (socket) => {
    try {
      const cookieHeader = socket.handshake.headers?.cookie || "";
      const cookiePairs = cookieHeader.split(";").map((c) => c.trim());
      const tokenPair = cookiePairs.find((c) => c.startsWith("token="));
      const token = tokenPair ? tokenPair.split("=").slice(1).join("=") : null;

      if (!token) {
        logger.warn("No token provided.");
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const username = decoded.username;

      if (!username) {
        logger.warn("Invalid token - username missing.");
        return;
      }

      socket.join(username); // Join the user to their own room
      logger.info(`${username} joined their room`);
    } catch (err) {
      logger.error("Socket auth error:", err.message);
      return;
    }

    // Handle incoming message
    socket.on("send message", async (chat) => {
      try {
        const { sender, receiver, content } = chat;

        const senderUser = await User.findOne({ username: sender });
        const receiverUser = await User.findOne({ username: receiver });

        if (!senderUser || !receiverUser) {
          logger.warn("Sender or receiver not found");
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

        logger.info(`Message sent to ${sender} and ${receiver}`);
      } catch (err) {
        logger.error("Error sending message via socket:", err.message);
      }
    });

    socket.on("disconnect", () => {
      logger.info("Socket disconnected");
    });
  });
}

module.exports = { initSocket };
