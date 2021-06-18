const express = require("express");
const dayjs = require("dayjs");
const { Habbit } = require("../models/Habbit");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/create", isLoggedIn, (req, res, next) => {
  const habbit = new Habbit({
    ...req.body,
    expiredDate: dayjs(req.body.expired),
  });

  habbit.save((err, doc) => {
    if (err) return res.status(401).send("습관을 저장하는데 실패했습니다.");
    res.status(200).send("ok");
  });
});

router.get(
  "/habbits/getTodayHabbits/:userId/:date",
  isLoggedIn,
  async (req, res, next) => {
    const habbits = await Habbit.find({
      writer: req.params.userId,
      expiredDate: { $lte: dayjs(req.params.date) },
      createdAt: { $gte: dayjs(req.params.date) },
    }).exec((err, habbits) => {
      if (err) return res.status(401).send("습관을 가져오는데 실패했습니다.");
      return habbits;
    });

    habbits = await habbits.filter(
      (habbit) => habbit.schedule.indexOf(dayjs(req.params.date).day()) === true
    );

    return res.status(200).json(habbits);
  }
);
module.exports = router;
