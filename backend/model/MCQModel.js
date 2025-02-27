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
      require: true,
    },
    ans: {
      type: Number,
      require: true,
    },
    like: {
      type: Number,
    },
    views: {
      type: Number,
    },
    des: [
      {
        post: String,
        postBy: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
      },
    ],
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MCQs", MCQModel);
