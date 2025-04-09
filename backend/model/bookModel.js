const mongoose = require("mongoose");
const { Schema } = mongoose;
// name iconUrl slug subCategory lesson[name slug] status
const BookModel = new Schema(
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
      require: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    lesson: Array,
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

module.exports = mongoose.model("Books", BookModel);
