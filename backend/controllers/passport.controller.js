// controllers/passport.controller.js
const jwt = require("jsonwebtoken");
require('dotenv').config();

const googleCallbackController = (req, res) => {
  console.log("--- Inside googleCallbackController ---");

  // 1. Check if Passport attached the user object
  console.log("1. req.user object:", req.user);

  if (!req.user) {
    console.error("ERROR: req.user is missing. Passport authentication likely failed.");
    return res.redirect(`${process.env.FRONTEND_URL}login?error=user_not_found`);
  }

  // 2. Check environment variables
  console.log("2. JWT_SECRET:", process.env.JWT_SECRET ? "Exists" : "MISSING!");
  console.log("3. FRONTEND_URL:", process.env.FRONTEND_URL);

  try {
    const payload = {
      id: req.user._id,
      username: req.user.username,
    };
    console.log("4. JWT Payload to be signed:", payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("5. Generated JWT:", token ? "Success!" : "Failed to generate token.");

    const redirectURL = `${process.env.FRONTEND_URL}oauth-success?token=${token}`;
    console.log("6. Final Redirect URL:", redirectURL);

    console.log("--- Redirecting now ---");
    res.redirect(redirectURL);

  } catch (error) {
    console.error("ERROR inside googleCallbackController:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=token_signing_failed`);
  }
};

module.exports = {
  googleCallbackController,
};