const { Router } = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");

const chatRouter = Router();

// Send a message
chatRouter.post("/addmessage", sendMessage);

// Get messages between two users
chatRouter.post("/getmessage", getMessages);

module.exports = { chatRouter };
