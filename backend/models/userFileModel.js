const { Schema, model } = require("mongoose");

const userFileModelSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    file_status: {
      type: String,
      default: "processing",
    },
  },
  { timestamps: true }
);

module.exports = model("userFiles", userFileModelSchema);
