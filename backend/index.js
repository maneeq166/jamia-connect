const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const {initSocket} = require("./sockets/socket");
const connectDB = require("./config/db");
const exploreRouter = require("./routes/exploreRoute");
const authRouter = require("./routes/authRoute");
const { profileRouter } = require("./routes/profileRoute");
const { chatRouter } = require("./routes/chatRoute");

// Create HTTP server (needed for socket.io)
const server = http.createServer(app);

// Setup Socket.IO server
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    credentials: true,
  },
});
// exporting all that io.on stuff in socket/socket.js
initSocket(io);


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
