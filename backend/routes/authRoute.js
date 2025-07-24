const {Router} = require("express");
const { userSignup, userSignin } = require("../controllers/authController");
const { passportLogin } = require("../controllers/passport.controller");
const passport = require("passport");
require("../config/passport.config");
const authRouter = Router();

authRouter.post("/signup",userSignup)
authRouter.post("/signin",userSignin)
authRouter.post(
  "/passport-login",
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      req.logIn(user, (err) => {
        if (err) return next(err);
        return next();
      });
    })(req, res, next);
  },
  passportLogin
);


module.exports = authRouter