const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "editor", "admin", "hold"],
      default: "student",
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "paid", "limited", "hold"],
      default: "free",
      required: true,
    },
    token: {
      type: String,
    },
    device: [
      {
        deviceID: String,
        userAgent: String,
        loginAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
