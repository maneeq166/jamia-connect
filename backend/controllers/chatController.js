const Message = require("../models/Message.js");

// POST /api/v1/chat/send
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    console.log(req.body);
    

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/v1/chat/messages/:from/:to
exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: from, receiver: to },
        { sender: to, receiver: from },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
