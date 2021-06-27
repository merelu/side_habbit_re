const mongoose = require("mongoose");

const { Schema } = mongoose;
const commitSchema = new Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  habbitId: {
    type: Schema.Types.ObjectId,
    ref: "Habbit",
  },
  createAt: {
    type: Date,
  },
});

const Commit = mongoose.model("Commit", commitSchema);
module.exports = { Commit };
