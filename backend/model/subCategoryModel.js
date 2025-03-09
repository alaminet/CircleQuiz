const mongoose = require("mongoose");
const { Schema } = mongoose;
const subCategoryModel = new Schema(
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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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

module.exports = mongoose.model("Subcategory", subCategoryModel);
