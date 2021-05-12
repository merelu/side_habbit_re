const { User } = require("../models/User");
const express = require("express");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/users/register", (req, res, next) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err)
      return res.status(401).json({ errorMessage: "아이디가 중복됩니다." });
    return res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  });
});

router.post("/users/login", (req, res, next) => {
  //요청된 이메일을 데이터 베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "제공된 이메일에 해당하는 유저가 없습니다." });
    }
    //요청한 이메일이 데이터 베이스에 있다면 비밀번호가 같은지 찾는다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ errorMessage: "비밀번호가 틀렸습니다." });
      }
      //비밀번호가 맞다면 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err)
          return res
            .status(401)
            .json({ errorMessage: "토큰생성에 실패했습니다." });
        res.cookie("x_auth", user.token).status(200).json({
          success: true,
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
      });
    });
  });
});

router.get("/users/auth", auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말이다.
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.get("/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      token: "",
    },
    (err, user) => {
      if (err) return res.status(500).json({ errorMessage: "로그아웃 실패" });
      return res.status(200).send("ok");
    }
  );
});

module.exports = router;
