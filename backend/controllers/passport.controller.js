// controllers/passport.controller.js
const jwt = require("jsonwebtoken");
require('dotenv').config();

const googleCallbackController = (req, res) => {
  const logger = require("../utils/logger");
  logger.debug("--- Inside googleCallbackController ---");

  // 1. Check if Passport attached the user object
  logger.debug({ reqUser: req.user });

  if (!req.user) {
    logger.error("ERROR: req.user is missing. Passport authentication likely failed.");
    return res.redirect(`${process.env.FRONTEND_URL}login?error=user_not_found`);
  }

  // 2. Check environment variables
  logger.debug("2. JWT_SECRET:", process.env.JWT_SECRET ? "Exists" : "MISSING!");
  logger.debug("3. FRONTEND_URL:", process.env.FRONTEND_URL);

  try {
    const payload = {
      id: req.user._id,
      username: req.user.username,
    };
    logger.debug("4. JWT Payload to be signed:", payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    logger.debug("5. Generated JWT:", token ? "Success!" : "Failed to generate token.");

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const redirectURL = `${process.env.FRONTEND_URL}oauth-success`;
    logger.debug("6. Final Redirect URL:", redirectURL);

    logger.debug("--- Redirecting now ---");
    res.redirect(redirectURL);

  } catch (error) {
    logger.error("ERROR inside googleCallbackController:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=token_signing_failed`);
  }
};

module.exports = {
  googleCallbackController,
};
