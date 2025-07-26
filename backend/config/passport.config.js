const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          // Generate a unique username based on displayName or email
          let baseUsername = profile.displayName.replace(/\s+/g, "").toLowerCase();
          let username = baseUsername;
          let counter = 1;

          // Ensure the username is unique
          while (await User.findOne({ username })) {
            username = `${baseUsername}${counter++}`;
          }

          user = await User.create({
            username,
            email
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
