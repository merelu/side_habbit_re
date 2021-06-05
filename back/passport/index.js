const passport = require("passport");
const local = require("./local");

const User = require("../models/User");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne(
        { _id: id },
        { name: 1, email: 1, role: 1, image: 1 }
      );
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
