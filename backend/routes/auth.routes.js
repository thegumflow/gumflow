const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/register", authControllers.user_register);
router.post("/login", authControllers.user_login);
router.post("/logout", authControllers.user_logout);
router.get("/get-user", authMiddleware, authControllers.get_user);
router.put(
  "/update-user-profile",
  authMiddleware,
  authControllers.update_user_profile
);
router.put(
  "/update-user-password",
  authMiddleware,
  authControllers.update_user_password
);

router.post("/forgot-password", authControllers.forgot_password);
router.post("/password/reset/:token", authControllers.reset_password);
router.get("/is-valid-reset-token/:token", authControllers.is_valid_token);

module.exports = router;
