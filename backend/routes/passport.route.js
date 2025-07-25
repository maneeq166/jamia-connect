const express = require("express");
const passport = require("passport");
const router = express.Router();
const { googleCallback } = require("../controllers/passport.controller");

// 1. Start Google Auth
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// 2. Callback URL
router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleCallback
);

module.exports = router;
