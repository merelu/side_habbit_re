const express = require("express");
const dayjs = require("dayjs");
const mongoose = require("mongoose");
const { Habbit } = require("../models/Habbit");
const { Commit } = require("../models/Commit");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/create", isLoggedIn, (req, res, next) => {
  const habbit = new Habbit(req.body);

  habbit.save((err, doc) => {
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
    const commits = await Commit.find({
      writer: req.params.userId,
      createAt: { $lte: dayjs(req.params.date).endOf("day") },
    }).exec();

    await Habbit.find({
      writer: req.params.userId,
      expiredDate: {
        $gte: dayjs(req.params.date),
      },
      [`schedule.${dayjs().day()}`]: true,
    }).exec((err, docs) => {
      if (err)
        return res
          .status(401)
          .json({ errorMessage: "습관을 가져오는데 실패했습니다." });
      const habbits = docs.filter(
        (habbit) =>
          commits.findIndex(
            (commit) => commit.habbitId.toString() === habbit._id.toString()
          ) < 0
      );

      return res.status(200).json({ success: true, habbits: habbits });
    });
  }
);
module.exports = router;
