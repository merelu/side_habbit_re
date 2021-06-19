const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const { User } = require("../models/User");

const router = express.Router();

router.get("/auth", (req, res, next) => {
  if (req.user) {
    return res.status(200).json({ success: true, user: req.user });
  } else {
    return res
      .status(401)
      .json({ errorMessage: "인증되지 않은 사용자 입니다. 로그인 해주세요" });
  }
});

router.post("/register", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({ email: req.body.email });
    if (exUser) {
      res.status(403).json({ errorMessage: "이미 사용 중인 이메일 입니다." });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });

    user.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).json({
        errorMessage: info.reason,
      });
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).json({
        success: true,
        user: await User.findOne(
          { _id: user._id },
          { name: 1, email: 1, role: 1, image: 1 }
        ),
      });
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
