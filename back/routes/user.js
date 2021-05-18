const { User } = require("../models/User");
const express = require("express");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", (req, res, next) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.status(401).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res, next) => {
  //요청된 이메일을 데이터 베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.status(401).json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });
    }
    //요청한 이메일이 데이터 베이스에 있다면 비밀번호가 같은지 찾는다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res
          .status(401)
          .json({ loginSuccess: false, message: "Wrong password" });
      }
      //비밀번호가 맞다면 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(401).send(err);
        res.cookie("x_authExp", user.tokenExp);
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      token: "",
      tokenExp: "",
    },
    (err, doc) => {
      if (err) return res.status(401).json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
