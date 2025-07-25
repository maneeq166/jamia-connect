const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("../config/passport.config");

const initPassport = (app) => {
  // Express session setup
  app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  }));

  // Passport init
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = initPassport;
