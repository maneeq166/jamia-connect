// // backend /config / passport.config.js
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/User");
// require('dotenv').config();

// // This is the main Google OAuth strategy configuration
// let callbackURL;
// if(process.NODE_ENV !== "development"){
//   callbackURL = process.env.GOOGLE_CALLBACK_URL_PROD
// }else{
//   callbackURL = process.env.GOOGLE_CALLBACK_URL
// }
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       // This callback URL must match the one in your Google Cloud Console credentials
//       // and the route defined in passport.route.js
//       callbackURL: callbackURL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // 1. Check if user already exists in DB via their Google ID
//         let user = await User.findOne({ googleId: profile.id });

//         if (user) {
//           // If user exists, pass them to the next middleware
//           return done(null, user);
//         }

//         // 2. If user doesn't exist, check if their email is already in use
//         user = await User.findOne({ email: profile.emails[0].value });
//         if (user) {
//           // If email exists (e.g., signed up with password before), link the Google ID
//           user.googleId = profile.id;
//           user.displayName = user.displayName || profile.displayName;
//           await user.save();
//           return done(null, user);
//         }

//         // 3. If user is completely new, create a new user record
//         let baseUsername = profile.displayName.replace(/\s+/g, "").toLowerCase();
//         let username = baseUsername;
//         let counter = 1;
//         while (await User.findOne({ username })) {
//           username = `${baseUsername}${counter++}`;
//         }

//         const newUser = await User.create({
//           googleId: profile.id,
//           username: username,
//           email: profile.emails[0].value,
//           displayName: profile.displayName,
//           // avatar: { url: profile.photos[0].value } // Optionally save profile picture
//         });

//         return done(null, newUser);
//       } catch (error) {
//         return done(error, false);
//       }
//     }
//   )
// );

// // Used to serialize the user for the session (or in our case, for the JWT)
// passport.serializeUser((user, done) => {
//   done(null, user.id); // user.id is the MongoDB _id
// });

// // Used to deserialize the user
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

// ✅ FIX 1: correct env check
const callbackURL =
  process.env.NODE_ENV === "production"
    ? process.env.GOOGLE_CALLBACK_URL_PROD
    : process.env.GOOGLE_CALLBACK_URL;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) return done(null, user);

        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          user.googleId = profile.id;
          user.displayName ||= profile.displayName;
          await user.save();
          return done(null, user);
        }

        let baseUsername = profile.displayName.replace(/\s+/g, "").toLowerCase();
        let username = baseUsername;
        let counter = 1;

        while (await User.findOne({ username })) {
          username = `${baseUsername}${counter++}`;
        }

        const newUser = await User.create({
          googleId: profile.id,
          username,
          email: profile.emails[0].value,
          displayName: profile.displayName,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

