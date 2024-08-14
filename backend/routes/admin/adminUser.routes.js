const adminUserControllers = require("../../controllers/admin/adminUserControllers");
const { authMiddleware } = require("../../middleware/adminMiddleware");

const router = require("express").Router();

router.get("/get-all-users", authMiddleware, adminUserControllers.get_all_user);
router.get(
  "/get-pending-users",
  authMiddleware,
  adminUserControllers.get_pending_users
);
router.get(
  "/get-single-user/:userId",
  authMiddleware,
  adminUserControllers.get_single_user
);
router.post(
  "/update-user-status/:userId",
  authMiddleware,
  adminUserControllers.update_user_status
);
router.get(
  "/get-users-files",
  authMiddleware,
  adminUserControllers.get_users_files
);
router.post(
  "/upload-template",
  authMiddleware,
  adminUserControllers.upload_template
);

router.put(
  "/update-file-status/:id",
  authMiddleware,
  adminUserControllers.update_file_status
);

router.get(
  "/file-details/:id",
  authMiddleware,
  adminUserControllers.get_single_file_details
);
router.get(
  "/get-templates",
  authMiddleware,
  adminUserControllers.get_templates
);

router.post(
  "/delete-template/:templateId",
  authMiddleware,
  adminUserControllers.delete_template
);

module.exports = router;
