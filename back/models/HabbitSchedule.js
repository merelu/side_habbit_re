const mongoose = require("mongoose");

const { Schema } = mongoose;
const habbitScheduleSchema = new Schema(
  {
    mon: {
      type: Boolean,
    },
    tue: {
      type: Boolean,
    },
    wed: {
      type: Boolean,
    },
    thu: {
      type: Boolean,
    },
    fri: {
      type: Boolean,
    },
    sat: {
      type: Boolean,
    },
    sun: {
      type: Boolean,
    },
    habbit: {
      type: Schema.Types.ObjectId,
      ref: "Habbit",
    },
  },
  { timestamps: true }
);

const HabbitSchedule = mongoose.model("HabbitSchedule", habbitScheduleSchema);
module.exports = { HabbitSchedule };
