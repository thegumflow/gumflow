const { Schema, model } = require("mongoose");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    phone: { type: String, default: "" },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    account_status: {
      type: String,
      default: "pending",
    },

    avatar: {
      type: String,
      default: "",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hash token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = model("users", userSchema);
