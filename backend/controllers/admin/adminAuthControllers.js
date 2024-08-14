const adminModel = require("../../models/adminModel");
const { createToken } = require("../../utils/tokenCreate");
const { responseReturn } = require("../../utils/response");
const bcrypt = require("bcrypt");

class adminAuthController {
  // admin login @POST /api/admin/auth/login

  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin._id,
            email: admin.email,
            role: "admin",
          });
          res.cookie("adminToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 201, {
            message: "Admin Login Success",
            token,
            userInfo: {
              id: admin._id,
              email: admin.email,
              role: "admin",
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
  // get admin info @GET /api/admin/auth/get-user

  get_user = async (req, res) => {
    const { id } = req;

    try {
      const user = await adminModel.findById(id);
      responseReturn(res, 200, { userInfo: user });
    } catch (error) {
      responseReturn(res, 404, { error: "user not found" });
      console.log(error.message);
    }
  };

  // End Method
}

module.exports = new adminAuthController();
