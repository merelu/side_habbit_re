const { User } = require("../models/User");
const express = require("express");

const router = express.Router();

router.post("/register", (req, res, next) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).json({
      success: true,
      userInfo,
    });
  });
});

module.exports = router;
