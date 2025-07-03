const Message = require("../models/Message");
const User = require("../models/User");

function initSocket(io) {
  io.on("connection", (socket) => {
    socket.on("send name", (username) => {
      io.emit("recieve name", username);
    });

    socket.on("send message", async (chat) => {
      try {
        const { sender, receiver, content } = chat;

        // Find the sender and receiver by username
        const senderUser = await User.findOne({ username: sender });
        const receiverUser = await User.findOne({ username: receiver });

        if (!senderUser || !receiverUser) {
          console.log("Sender or receiver not found");
          return;
        }

        // Save the message with ObjectId references
        const savedMsg = await Message.create({
          sender: senderUser._id,
          receiver: receiverUser._id,
          content,
        });

        // Send back the raw saved message (ObjectIds included)
        socket.broadcast.emit("receive message", savedMsg);

      } catch (err) {
        console.error("Error sending message via socket:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
}

module.exports = {
  initSocket,
};
