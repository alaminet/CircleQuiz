const mongoose = require("mongoose");
const { Schema } = mongoose;
const discriptionModel = new Schema(
  {
    disc: {
      type: String,
      require: true,
    },
    by: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    questionType: {
        type: String,
        enum: ['MCQs', 'Writtens'],
        required: true
      },
      questionId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'questionType'
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

module.exports = mongoose.model("Discriptions", discriptionModel);
