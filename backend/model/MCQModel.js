const mongoose = require("mongoose");
const { Schema } = mongoose;
const MCQModel = new Schema(
  {
    question: {
      type: String,
      require: true,
    },
    options: {
      type: Array,
    },
    ans: {
      type: Number,
    },
    des: {
      type: String,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topics",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    tag: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tags",
      },
    ],
    status: {
      type: String,
      enum: ["waiting", "approved", "hold", "delete"],
      default: "waiting",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MCQs", MCQModel);
