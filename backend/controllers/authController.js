const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const buildAuthCookieOptions = () => {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};

const userSignup = async (req, res) => {
  logger.debug({ requestBody: req.body });

  try {
    const { username, email, password } = req.body;

    const [nameExists, userExists] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);

    if (nameExists) {
      return res.status(400).json({ message: "Naam pehle hi leliya gya hai😔", success: false });
    }
    if (userExists) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedpassword,
    });

    if (!user) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
      });
    }

    return res.json({ message: `${username} Signed up `, success: true });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Input field cannot be empty" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const userMatched = await bcrypt.compare(password, user.password);
    if (!userMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Sign JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, buildAuthCookieOptions());
    return res.json({
      message: "Signed in",
      success: true,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userSignup,
  userSignin,
  logoutUser: (req, res) => {
    try {
      const options = buildAuthCookieOptions();
      delete options.maxAge;
      res.clearCookie("token", options);
      return res.json({ message: "Logged out", success: true });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
