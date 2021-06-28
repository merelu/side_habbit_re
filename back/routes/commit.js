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
  Commit.find({ createAt: { $lte: dayjs(req.params.date).endOf("day") } })
    .populate("habbitId", "title category")
    .exec((err, docs) => {
      if (err)
        return res
          .status(401)
          .json({ errorMessage: "습관을 가져오는데 실패했습니다." });
      return res.status(200).json({
        successs: true,
        pushed: docs,
      });
    });
});

module.exports = router;
