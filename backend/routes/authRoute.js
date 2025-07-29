const {Router} = require("express");
const { userSignup, userSignin } = require("../controllers/authController");
const passport = require("passport");
const { googleCallbackController } = require("../controllers/passport.controller");
require("../config/passport.config");
const authRouter = Router();

authRouter.post("/signup",userSignup)
authRouter.post("/signin",userSignin)

// Route 1: The initial call to start the Google OAuth flow.
// The user will be redirected to Google's sign-in page.
// The 'scope' specifies what information we are requesting from Google.
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route 2: The callback URL that Google redirects to after authentication.
// It has two middleware functions:
// 1. passport.authenticate: Verifies the user with Google and, on success, calls the strategy's 'done' function.
// 2. googleCallbackController: Our custom controller to handle JWT creation and redirection.
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`, // Redirect on failure
    session: false, // We are using JWTs, not sessions
  }),
  googleCallbackController
);


module.exports = authRouter