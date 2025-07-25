const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          username: profile.displayName.replace(/\s/g, "") + Math.floor(Math.random() * 1000),
          email,
          avatar: {
            url: profile.photos[0].value
          }
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));
