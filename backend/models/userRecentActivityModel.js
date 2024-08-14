const { Schema, model } = require("mongoose");

const userRecentActivitySchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    activityStatus: {
      type: String,
      default: "pending",
    },
    // user: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = model("userRecentActivities", userRecentActivitySchema);
