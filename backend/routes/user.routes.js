const userContollers = require("../controllers/userContollers");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get(
  "/recent-activity",
  authMiddleware,
  userContollers.get_recent_activity
);
router.post("/file-upload", authMiddleware, userContollers.file_upload);
router.get("/get-templates", authMiddleware, userContollers.get_templates);
router.get("/get-my-files", authMiddleware, userContollers.get_my_files);
router.post(
  "/email-to-admin",
  authMiddleware,
  userContollers.send_email_to_admin
);

module.exports = router;
