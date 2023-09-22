const passport = require("passport");
const User = require("../models/userModel");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//----------LocalStrategy Setup----------//
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Username!" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password!" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

//----------Sessions and Serialization----------//
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
