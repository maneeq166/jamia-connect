const Message = require("../models/Message");
const User = require("../models/User"); // Adjust path if needed

//http:localhost:3000/api/v1/chat/addmessage or getmessage

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    // Find sender and receiver by username
    const senderUser = await User.findOne({ username: sender });
    const receiverUser = await User.findOne({ username: receiver });

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: "Sender or receiver not found", success: false });
    }

    const data = await Message.create({
      sender: senderUser._id,
      receiver: receiverUser._id,
      content,
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Message not sent", success: false });
  }
};
exports.getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    const senderUser = await User.findOne({ username: sender });
    const receiverUser = await User.findOne({ username: receiver });

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: "Sender or receiver not found", success: false });
    }

    const messages = await Message.find({
  $or: [
    { sender: senderUser._id, receiver: receiverUser._id },
    { sender: receiverUser._id, receiver: senderUser._id },
  ],
})
  .sort({ timestamp: 1 })
  .populate("sender", "username")   // Only get 'username' from sender
  .populate("receiver", "username"); // Same for receiver

  console.log(messages);
  

    return res.status(200).json({ messages, success: true });
  } catch (error) {
    console.log("error in chatController getMessages", error);
    return res.status(404).json({ message: "Messages not found", success: false });
  }
};
