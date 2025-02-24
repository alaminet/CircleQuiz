const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["free", "paid", "instructor", "editor", "admin", "hold"],
      default: "free",
      required: true,
    },
    // courses: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Course",
    //   },
    // ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
