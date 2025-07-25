const jwt = require("jsonwebtoken");

const googleCallback = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
};

module.exports = {
  googleCallback,
};
