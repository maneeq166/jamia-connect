const { Router } = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");

const chatRouter = Router();

// Send a message
chatRouter.post("/send", sendMessage);

// Get messages between two users
chatRouter.get("/messages/:from/:to", getMessages);

module.exports = { chatRouter };
