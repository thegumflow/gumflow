const userFileModel = require("../../models/userFileModel");
const userModel = require("../../models/userModel");
const templateModel = require("../../models/templateModel");
const userRecentActivityModel = require("../../models/userRecentActivityModel");
const { responseReturn } = require("../../utils/response");

class adminUserController {
  // all user @GET /api/admin/get-all-users
  get_all_user = async (req, res) => {
    const perPage = 10;
    const { currentPage, searchValue } = req.query;

    const skipPage = parseInt(perPage) * (parseInt(currentPage) - 1);

    try {
      // search query object
      let searchQuery = {};
      if (searchValue) {
        const searchRegex = new RegExp(searchValue, "i");
        searchQuery = {
          $or: [
            { fullName: searchRegex },
            { companyName: searchRegex },
            { email: searchRegex },
          ],
        };
      }

      const users = await userModel
        .find(searchQuery)
        .skip(skipPage)
        .limit(perPage)
        .sort({ createdAt: -1 })
        .exec();

      // Formatting users to match for table
      const formattedUsers = users.map((user) => ({
        _id: user._id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        account_status: user.account_status,
        avatar: user?.avatar,
      }));

      const totalUser = await userModel.find(searchQuery).countDocuments();

      res.status(200).json({
        users: formattedUsers,
        total: totalUser,
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // user request pending @GET /api/admin/get-pending-users
  get_pending_users = async (req, res) => {
    const perPage = 10;
    const { currentPage, searchValue } = req.query;

    try {
      const skipPage = parseInt(perPage) * (parseInt(currentPage) - 1);
      // Pipeline stages for aggregation
      const pipeline = [];

      // Stage 1: Match pipeline to filter by account_status and searchValue if provided
      pipeline.push({
        $match: {
          account_status: "pending",
          $or: [
            { fullName: { $regex: searchValue, $options: "i" } },
            { email: { $regex: searchValue, $options: "i" } },
            { companyName: { $regex: searchValue, $options: "i" } },
          ],
        },
      });

      pipeline.push({ $sort: { createdAt: -1 } });

      // Stage 2: Skip and limit for pagination
      pipeline.push({ $skip: skipPage });
      pipeline.push({ $limit: perPage });

      // Stage 3: Sorting
      pipeline.push({ $sort: { createdAt: -1 } });

      // Execute aggregation pipeline
      const users = await userModel.aggregate(pipeline);

      // const users = await userModel
      //   .find(searchQuery)
      //   .skip(skipPage)
      //   .limit(perPage)
      //   .sort({ createdAt: -1 })
      //   .exec();

      // Formatting users to match for table
      const formattedUsers = users.map((user) => ({
        _id: user._id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        account_status: user.account_status,
        companyName: user.companyName,
      }));

      let totalPendingUser;

      if (searchValue) {
        totalPendingUser = (await userModel.aggregate(pipeline)).length;
      } else {
        totalPendingUser = await userModel
          .find({ account_status: "pending" })
          .countDocuments();
      }

      responseReturn(res, 200, {
        users: formattedUsers,
        total: totalPendingUser,
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // get single user @GET /api/admin/get-single-user
  get_single_user = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await userModel.findById(userId);
      responseReturn(res, 200, {
        user,
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // update user status @POST /api/admin/update-user-status
  update_user_status = async (req, res) => {
    const { userId } = req.params;

    try {
      await userModel.findByIdAndUpdate(userId, {
        account_status: req.body.status,
      });

      await userRecentActivityModel.create({
        activity: "User account status updated",
        activityStatus: req.body.status,
        userId,
      });

      responseReturn(res, 200, {
        message: "User status updated successfully",
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // get all user uploaded file @GET /api/admin/get-users-files
  // get_users_files = async (req, res) => {
  //   const perPage = 10;
  //   const { currentPage, searchValue } = req.query;

  //   const skipPage = parseInt(perPage) * (parseInt(currentPage) - 1);

  //   try {
  //     // search query object
  //     let searchQuery = {};
  //     if (searchValue) {
  //       const searchRegex = new RegExp(searchValue, "i");
  //       searchQuery = {
  //         $or: [
  //           { fullName: searchRegex },
  //           { companyName: searchRegex },
  //           { description: searchRegex },
  //           // { email: searchRegex },
  //         ],
  //       };
  //     }

  //     const files = await userFileModel
  //       .find(searchQuery)
  //       .skip(skipPage)
  //       .limit(perPage)
  //       .sort({ createdAt: -1 })
  //       .populate("userId");

  //     const totalFiles = await userFileModel.find(searchQuery).countDocuments();

  //     responseReturn(res, 200, {
  //       files,
  //       total: totalFiles,
  //     });
  //   } catch (error) {
  //     responseReturn(res, 200, {
  //       error: error.message,
  //     });
  //   }
  // };

  get_users_files = async (req, res) => {
    const perPage = 10;
    const { currentPage, searchValue } = req.query;

    const skipPage = parseInt(perPage) * (parseInt(currentPage) - 1);

    try {
      // Define the base pipeline
      const pipeline = [
        {
          $lookup: {
            from: "users", // The collection name of the referenced model
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ];

      // Add the search condition if searchValue is provided
      if (searchValue) {
        const searchRegex = new RegExp(searchValue, "i");
        pipeline.push({
          $match: {
            $or: [
              { "user.fullName": { $regex: searchRegex } },
              { "user.companyName": { $regex: searchRegex } },
              { description: { $regex: searchRegex } },
            ],
          },
        });
      }

      // Add pagination and sorting stages
      pipeline.push(
        { $skip: skipPage },
        { $limit: perPage },
        { $sort: { createdAt: -1 } }
      );

      // Execute the aggregation pipeline
      const files = await userFileModel.aggregate(pipeline);

      // Get the total count of files matching the search criteria
      const countPipeline = [...pipeline];
      countPipeline.pop(); // Remove the $skip, $limit, and $sort stages
      const totalFilesArray = await userFileModel.aggregate([
        ...countPipeline,
        { $count: "total" },
      ]);
      const totalFiles =
        totalFilesArray.length > 0 ? totalFilesArray[0].total : 0;

      responseReturn(res, 200, {
        files,
        total: totalFiles,
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // upload a template @POST /api/admin/upload-template
  upload_template = async (req, res) => {
    const { name, url } = req.body;
    try {
      await templateModel.create({
        name,
        url,
      });

      responseReturn(res, 200, {
        message: "Template uploaded successfully",
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // delete a template @POST /api/admin/delete-template/:templateId
  delete_template = async (req, res) => {
    const { templateId } = req.params;
    try {
      await templateModel.findByIdAndDelete(templateId);

      responseReturn(res, 200, {
        message: "Template deleted successfully",
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // update file status @PUT /api/admin/update-file-status/:id
  update_file_status = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      await userFileModel.findByIdAndUpdate(id, { file_status: status });

      const userFile = await userFileModel.findById(id);

      await userRecentActivityModel.create({
        userId: userFile.userId,
        activityStatus: status,
        activity: "File status updated",
      });

      responseReturn(res, 200, {
        message: "File status updated successfully",
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // get a file details @GET /api/admin/file-details/:id
  get_single_file_details = async (req, res) => {
    const { id } = req.params;

    try {
      const file = await userFileModel.findById(id).populate("userId");

      responseReturn(res, 200, {
        file,
      });
    } catch (error) {
      responseReturn(res, 200, {
        error: error.message,
      });
    }
  };

  // get all templates @GET /api/admin/get-templates
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
}

module.exports = new adminUserController();
