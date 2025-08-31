const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan")

const { initSocket } = require("./sockets/socket");
const connectDB = require("./config/db");

const exploreRouter = require("./routes/exploreRoute");
const authRouter = require("./routes/authRoute");
const { profileRouter } = require("./routes/profileRoute");
const { chatRouter } = require("./routes/chatRoute");
const { pyqRouter } = require("./routes/pyq.route");
const blogRouter = require("./routes/blog.route");
const { scrapeRouter } = require("./routes/scrape.route.js");



const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://jamia-connect.vercel.app"],
    credentials: true,
  },
});


initSocket(io);

// Middlewares
app.use(helmet());
app.use(morgan("dev"))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://jamia-connect.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));


// Initialize passport (session & strategies)
const passport = require("passport");
require("./config/passport.config");
app.use(passport.initialize());


// Routes
app.get("/",(req,res)=>res.send("Welcome, to jamia connect api"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/explore", exploreRouter);
app.use("/api/v1/pyqs", pyqRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/scrape", scrapeRouter);

// Connect DB & Start Server
async function connection() {
  try {
    await connectDB();
    console.log("Database is connected");

    server.listen(process.env.PORT, () =>
      console.log("Server running on port:", process.env.PORT)
    );
  } catch (error) {
    console.error("Connection error:", error);
  }
}

connection();

// 404 Handler
app.use((req, res) => {
  return res.status(404).json({ message: "Route not found (404)", success: false });
});
