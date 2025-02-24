const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WrittenSchema = new Schema(
  {
    question: String,
    answer: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Writtens", WrittenSchema);
