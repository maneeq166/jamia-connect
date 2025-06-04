const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "token does not exist" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken:",decodedToken);
    if (!decodedToken) {
      return res.status(400).json({ message: "User does not exists" });
    } else {
      req.userId = decodedToken.id;
      next();
    }
  } catch (error) {
    console.log("Error in authMiddleware:", error);
    res.status(400).json({message:"Unauthorized:Invalid or Expired token"})
  }
}

module.exports = {authMiddleware}
