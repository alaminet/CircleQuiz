const mongoose = require("mongoose");
const { Schema } = mongoose;
const topicsModel = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    iconUrl: {
      type: String,
    },
    slug: {
      type: String,
    },
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

module.exports = mongoose.model("Topics", topicsModel);
