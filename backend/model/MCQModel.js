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
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],

    views: {
      type: Number,
      default: 0,
    },
    des: [
      {
        post: String,
        createdAt: Date,
        like: [
          {
            type: Schema.Types.ObjectId,
            ref: "Users",
          },
        ],
        posted: {
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
    created: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MCQs", MCQModel);
