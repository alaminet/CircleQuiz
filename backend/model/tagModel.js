const mongoose = require("mongoose");
const { Schema } = mongoose;
const tagModel = new Schema(
  {
    name: {
      type: String,
      require: true,
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

module.exports = mongoose.model("Tags", tagModel);
