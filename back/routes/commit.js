const express = require("express");
const dayjs = require("dayjs");
const { Commit } = require("../models/Commit");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/pushCommited", isLoggedIn, (req, res, next) => {
  const pushed = [];
  req.body.forEach((item) => {
    const commit = new Commit({
      writer: item.writer,
      habbitId: item.habbitId,
      createAt: item.createAt,
    });

    commit.save((err, doc) => {
      if (err)
        return res
          .status(401)
          .json({ errorMessage: `push failure habbitId:${item.habbitId}` });
      console.log(doc);
      pushed.push(doc);
    });
  });

  console.log("asdf", pushed);
  return res.status(200).json({
    successs: true,
    pushed: pushed,
  });
});

module.exports = router;
