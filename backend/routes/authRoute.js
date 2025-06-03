const {Router} = require("express");
const { userSignup, userSignin } = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/signup",userSignup)
authRouter.post("/signin",userSignin)


module.exports = authRouter