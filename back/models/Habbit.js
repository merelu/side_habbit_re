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
    },
  },
  { timestamps: true }
);

const Habbit = mongoose.model("Habbit", habbitSchema);
module.exports = { Habbit };
