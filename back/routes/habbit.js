const express = require("express");
const dayjs = require("dayjs");
const { Habbit } = require("../models/Habbit");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/create", isLoggedIn, (req, res, next) => {
  const habbit = new Habbit(req.body);

  habbit.save((err, doc) => {
    console.log(doc);
    if (err)
      return res
        .status(401)
        .json({ errorMessage: "습관을 저장하는데 실패했습니다." });
    res.status(200).json({
      successs: true,
      habbit: doc,
    });
  });
});

router.get(
  "/getTodayHabbits/:userId/:date",
  isLoggedIn,
  async (req, res, next) => {
    const habbits = await Habbit.find({
      writer: req.params.userId,
      expiredDate: { $gte: dayjs(req.params.date) },
    }).exec((err, values) => {
      if (err)
        return res
          .status(401)
          .json({ errorMessage: "습관을 가져오는데 실패했습니다." });
      const habbits = values.filter(
        (value) => value.schedule[dayjs().day()] === true
      );

      res.status(200).json({ success: true, habbits });
    });
  }
);
module.exports = router;
