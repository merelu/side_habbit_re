const express = require("express");
const dayjs = require("dayjs");
const { Commit } = require("../models/Commit");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/pushCommited", isLoggedIn, (req, res, next) => {
  Commit.insertMany(req.body, (err, docs) => {
    if (err)
      return res
        .status(401)
        .json({ errorMessage: `push failure habbitId:${item.habbitId}` });
    return res.status(200).json({
      successs: true,
      pushed: docs,
    });
  });
});

router.get("/getTodayPushed/:date", isLoggedIn, (req, res, next) => {
  Commit.find({
    createAt: {
      $lte: dayjs(req.params.date).endOf("day"),
      $gte: dayjs(req.params.date).startOf("day"),
    },
  })
    .populate("habbitId", "title category")
    .exec((err, docs) => {
      if (err)
        return res
          .status(401)
          .json({ errorMessage: "금일 push한 습관이 없습니다." });
      return res.status(200).json({
        successs: true,
        pushed: docs,
      });
    });
});

router.get(
  "/getPushedWithinRange/:startDate/:endDate",
  isLoggedIn,
  (req, res, next) => {
    Commit.find({
      createAt: {
        $lte: dayjs(req.params.startDate).endOf("day"),
        $gte: dayjs(req.params.endDate).startOf("day"),
      },
    })
      .populate("habbitId", "title category")
      .exec((err, docs) => {
        if (err)
          return res
            .status(401)
            .json({ errorMessage: "기간내 push한 commit이 없습니다." });
        return res.status(200).json({
          successs: true,
          pushedAll: docs,
        });
      });
  }
);

module.exports = router;
