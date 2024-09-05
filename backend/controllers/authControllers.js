const userModel = require("../models/userModel");
const adminModel = require("../models/adminModel");

const { createToken } = require("../utils/tokenCreate");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendPasswordResetEmail } = require("../utils/resend");

class userAuthController {
  // user register @POST /api/auth/register
  user_register = async (req, res) => {
    const { firstName, lastName, email, password, companyName, phone } =
      req.body;

    const fullName = `${firstName} ${lastName}`;
    const slug = `${firstName}-${lastName}`;

    try {
      const user = await userModel.findOne({ email });
      if (user) {
        responseReturn(res, 404, { error: "Email Already Exits" });
      } else {
        const createUser = await userModel.create({
          firstName: firstName.trim(),
          email: email.trim(),
          lastName: lastName.trim(),
          companyName: companyName.trim(),
          phone: phone.trim(),
          slug: slug.trim(),
          fullName: fullName.trim(),
          password: await bcrypt.hash(password, 10),
        });

        const token = await createToken({
          id: createUser._id,
          firstName: createUser.firstName,
          lastName: createUser.lastName,
          fullName: createUser.fullName,
          slug: createUser.slug,
          companyName: createUser.companyName,
          phone: createUser.phone,
          email: createUser.email,
          role: "user",
          account_status: createUser.account_status,
        });

        res.cookie("userToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        responseReturn(res, 201, { message: "User Register Success", token });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Error : " + error.message });
    }
  };

  // End Method
  // user login @POST /api/auth/login

  user_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email }).select("+password");
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = await createToken({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            slug: user.slug,
            companyName: user.companyName,
            phone: user.phone,
            email: user.email,
            role: "user",
            account_status: user?.account_status,
          });
          res.cookie("userToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 201, {
            message: "User Login Success",
            token,
            userInfo: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              fullName: user.fullName,
              slug: user.slug,
              companyName: user.companyName,
              phone: user.phone,
              email: user.email,
              role: "user",
              account_status: user?.account_status,
            },
          });
        } else {
          responseReturn(res, 404, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email Not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Error : " + error.message });
      console.log(error.message);
    }
  };

  // End Method
  // user register @POST /api/auth/logout

  user_logout = async (req, res) => {
    res.cookie("userToken", "", {
      expires: new Date(Date.now()),
    });

    res.cookie("adminToken", "", {
      expires: new Date(Date.now()),
    });

    responseReturn(res, 200, { message: "Logout Success" });
  };

  // End Method
  // get user info @PUT /api/auth/update-user-profile

  update_user_profile = async (req, res) => {
    const { id } = req;
    const body = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      responseReturn(res, 404, { error: "No user found" });
    }

    if (!body) {
      responseReturn(res, 403, { error: "Nothing is changed" });
    }

    if (body?.firstName && body?.lastName) {
      body.fullName = `${body?.firstName} ${body?.lastName}`;
    } else if (body?.firstName) {
      body.fullName = `${body?.firstName} ${user?.lastName}`;
    } else if (body?.lastName) {
      body.fullName = `${user?.firstName} ${body?.lastName}`;
    }

    try {
      const userInfo = await userModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      responseReturn(res, 200, {
        message: "Profile updated successfully",
        userInfo,
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 404, { error: "user not found" });
    }
  };

  // End Method
  // get user info @GET /api/auth/get-user

  get_user = async (req, res) => {
    const { id } = req;
    try {
      const user = await userModel.findById(id);

      responseReturn(res, 200, { userInfo: user });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 404, { error: "user not found" });
    }
  };

  // End Method
  // get user info @GET /api/auth/update-user-password

  update_user_password = async (req, res) => {
    const { id } = req;
    const { confirmPassword, newPassword, oldPassword } = req.body;

    if (!confirmPassword || !newPassword || !oldPassword) {
      responseReturn(res, 401, { error: "Please fill all fields" });
    }

    if (confirmPassword !== newPassword) {
      responseReturn(res, 401, { error: "Passwords don't match." });
    }

    try {
      const user = await userModel.findById(id).select("+password");
      if (!user) {
        return responseReturn(res, 404, { error: "No user found" });
      }
      const match = await bcrypt.compare(oldPassword, user.password);

      if (match) {
        await userModel.findByIdAndUpdate(id, {
          password: await bcrypt.hash(newPassword, 10),
        });

        return responseReturn(res, 200, {
          message: "Password changed successfully",
        });
      } else {
        return responseReturn(res, 401, {
          error: "Your old password is wrong",
        });
      }
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 404, { error: "user not found" });
    }
  };
  forgot_password = async (req, res) => {
    const { email } = req.body;
    try {
      // for admin
      const adminUser = await adminModel.findOne({ email });
      if (adminUser) {
        const resetToken = adminUser.getResetPasswordToken();

        await adminUser.save();

        const resetUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`;

        const emailResponse = await sendPasswordResetEmail(
          adminUser.email,
          "",
          resetUrl
        );
        if (!emailResponse.success) {
          return responseReturn(res, 404, {
            error: emailResponse.message,
          });
        }

        return responseReturn(res, 200, {
          message: "Check your email for a link to reset your password.",
        });
      }

      // for user
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return responseReturn(res, 404, {
          error: "user not found with this email",
        });
      }

      const resetToken = user.getResetPasswordToken();

      await user.save();

      // create reset password url

      const resetUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`;

      const emailResponse = await sendPasswordResetEmail(
        user.email,
        user.fullName,
        resetUrl
      );
      if (!emailResponse.success) {
        return responseReturn(res, 404, {
          error: emailResponse.message,
        });
      }

      return responseReturn(res, 200, {
        message: "Check your email for a link to reset your password.",
      });
    } catch (error) {
      console.log(error.message);
      return responseReturn(res, 404, { error: error.message });
    }
  };

  reset_password = async (req, res) => {
    const { token } = req.params;
    try {
      const body = req.body;

      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return responseReturn(res, 404, {
          error: "Password reset token is invalid or has been expired",
        });
      }

      if (body.newPassword !== body.confirmPassword) {
        return responseReturn(res, 400, { error: "Password doesn't match" });
      }

      user.password = await bcrypt.hash(body.newPassword, 10);

      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;

      await user.save();
      responseReturn(res, 201, { message: "Password changed successfully" });
    } catch (error) {
      responseReturn(res, 400, { error: error.message });
    }
  };

  is_valid_token = async (req, res) => {
    const { token } = req.params;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    try {
      const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (user) {
        return responseReturn(res, 201, {
          message: "Token is valid",
        });
      } else {
        return responseReturn(res, 400, {
          error: "Password reset token is invalid or has been expired",
        });
      }
    } catch (error) {
      return responseReturn(res, 400, { error: error.message });
    }
  };
}

module.exports = new userAuthController();
