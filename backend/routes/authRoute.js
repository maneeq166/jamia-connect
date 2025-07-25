const {Router} = require("express");
const { userSignup, userSignin } = require("../controllers/authController");
const { passportLogin } = require("../controllers/passport.controller");
const passport = require("passport");
require("../config/passport.config");
const authRouter = Router();

authRouter.post("/signup",userSignup)
authRouter.post("/signin",userSignin)


module.exports = authRouter