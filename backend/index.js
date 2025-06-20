const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");
const authRouter = require("./routes/authRoute");
const { profileRouter } = require("./routes/profileRoute");
const { chatRouter } = require("./routes/chatRoute");

// Create HTTP server (needed for socket.io)
const server = http.createServer(app);

// Setup Socket.IO server
const { Server } = require("socket.io");
const exploreRouter = require("./routes/exploreRoute");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});


// Store online users (or manage via Redis in production)
let onlineUsers = {};

// 🔌 Socket.IO Events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When user joins with their userId
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("User joined:", userId);
  });

  // Receiving and forwarding a private message
  socket.on("private-message", ({ to, message }) => {
    const receiverSocketId = onlineUsers[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("private-message", message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const [userId, sockId] of Object.entries(onlineUsers)) {
      if (sockId === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
  });
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS for REST API
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/explore",exploreRouter)

// Connect to DB and start server
async function connection() {
  try {
    console.log("Database is connecting....");
    await connectDB();
    console.log("Database is connected");

    server.listen(process.env.PORT, () => {
      console.log("Server running on port:", process.env.PORT);
    });

  } catch (error) {
    console.error("Connection error:", error);
  }
}

connection();
