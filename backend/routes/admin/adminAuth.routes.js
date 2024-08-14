const adminAuthControllers = require("../../controllers/admin/adminAuthControllers");
const { authMiddleware } = require("../../middleware/adminMiddleware");

const router = require("express").Router();

router.post("/login", adminAuthControllers.admin_login);
router.get("/get-user", authMiddleware, adminAuthControllers.get_user);

module.exports = router;
