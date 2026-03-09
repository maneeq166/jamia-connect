const { Router } = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");

const chatRouter = Router();

// Send a message
const { runValidations, sendMessageValidator, getMessagesValidator } = require("../middleware/validators");
chatRouter.post("/addmessage", runValidations(sendMessageValidator()), sendMessage);

// Get messages between two users
chatRouter.get("/getmessage", runValidations(getMessagesValidator()), getMessages);

module.exports = { chatRouter };
