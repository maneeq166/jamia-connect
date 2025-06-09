const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Token does not exist" });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "User does not exist" });
    }

    req.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log("Error in authMiddleware:", error);
    res.status(401).json({ message: "Unauthorized: Invalid or Expired token" });
  }
}

module.exports = {authMiddleware}
