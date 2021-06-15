const mongoose = require("mongoose");

const { Schema } = mongoose;
const habbitSchema = new Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: Number,
    },
    expired: {
      type: Boolean,
    },
    expiredDate: {
      type: Date,
    },
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

const Habbit = mongoose.model("Habbit", habbitSchema);
module.exports = { Habbit };
