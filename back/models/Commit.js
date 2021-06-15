const mongoose = require("mongoose");

const { Schema } = mongoose;
const commitSchema = new Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "HabbitSchedule",
    },
  },
  { timestamps: true }
);

const Commit = mongoose.model("Commit", commitSchema);
module.exports = { Commit };
