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
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
