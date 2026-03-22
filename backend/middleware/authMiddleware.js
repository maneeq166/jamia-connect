const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    // Read token from cookie (raw JWT or "Bearer <token>") or Authorization header
    const cookieToken = req.cookies?.token;
    const headerToken = req.headers?.authorization;
    const rawToken = cookieToken || headerToken;
    if (!rawToken) {
      return res.status(401).json({ message: "Token does not exist" });
    }

    const token = rawToken.startsWith("Bearer ") ? rawToken.split(" ")[1] : rawToken;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "User does not exist" });
    }

    req.userId = decodedToken.id;
    req.username = decodedToken.username;

    next();
  } catch (error) {
    const logger = require("../utils/logger");
    logger.error("Error in authMiddleware:", error);
    res.status(401).json({ message: "Unauthorized: Invalid or Expired token" });
  }
}

module.exports = {authMiddleware}
