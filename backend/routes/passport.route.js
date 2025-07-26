// routes/authRoute.js
const express = require("express");
const passPortRouter = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

passPortRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

passPortRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);

  }
);

module.exports = passPortRouter;
