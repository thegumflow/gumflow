const { Schema, model } = require("mongoose");

const templateModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("templates", templateModelSchema);
