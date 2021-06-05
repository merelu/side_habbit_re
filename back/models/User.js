const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
