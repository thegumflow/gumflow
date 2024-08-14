const templateModel = require("../models/templateModel");
const userFileModel = require("../models/userFileModel");
const userRecentActivityModel = require("../models/userRecentActivityModel");
const { responseReturn } = require("../utils/response");
const { sendEmailToAdmin } = require("../utils/resend");

class userController {
  // user rencent activity @GET /api/user/recent-activity
  get_recent_activity = async (req, res) => {
    const perPage = 10;
    const { currentPage } = req.query;

    const userId = req.id;

    const skipPage = parseInt(perPage) * (parseInt(currentPage) - 1);

    try {
      const recentActivities = await userRecentActivityModel
        .find({
          userId: userId,
        })
        .skip(skipPage)
        .limit(perPage)
        .sort({ createdAt: -1 });

      const total = await userRecentActivityModel
        .find({
          userId: userId,
        })
        .countDocuments();

      responseReturn(res, 200, {
        recentActivities,
        total,
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  file_upload = async (req, res) => {
    try {
      const { description, url, type } = req.body;

      await userFileModel.create({
        description,
        url,
        type,
        userId: req.id,
      });

      await userRecentActivityModel.create({
        userId: req.id,
        activityStatus: "processing",
        activity: "File uploaded",
      });

      responseReturn(res, 200, {
        message: "File uploaded successfully",
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // get all templates @GET /api/user/get-templates
  get_templates = async (req, res) => {
    try {
      const templates = await templateModel.find({}).sort({ createdAt: -1 });

      responseReturn(res, 200, {
        templates,
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // get my all files @GET /api/user/get-my-files
  get_my_files = async (req, res) => {
    const perPage = 10;
    const { currentPage } = req.query;
    const skipPage = parseInt(perPage) * (parseInt(currentPage) - 1);

    const userId = req.id;
    try {
      const myFiles = await userFileModel
        .find({
          userId: userId,
        })
        .skip(skipPage)
        .limit(perPage)
        .sort({ createdAt: -1 });

      const myTotalFiles = await userFileModel
        .find({
          userId: userId,
        })
        .countDocuments();

      responseReturn(res, 200, {
        myFiles,
        total: myTotalFiles,
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // sned email to admin @POST /api/user/email-to-admin
  send_email_to_admin = async (req, res) => {
    const { email, issue, message, phone } = req.body;

    try {
      if (email && issue && message && phone) {
        const emailResponse = await sendEmailToAdmin(
          email,
          issue,
          message,
          phone
        );
        if (!emailResponse.success) {
          return responseReturn(res, 404, {
            error: emailResponse.message,
          });
        }

        return responseReturn(res, 200, {
          message: "Email sent to admin successfully",
        });
      } else {
        responseReturn(res, 403, {
          error: "Some fileds are missing",
        });
      }
    } catch (error) {
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };
}

module.exports = new userController();
