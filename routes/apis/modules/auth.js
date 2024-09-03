const express = require("express");
const router = express.Router();
const authController = require("../../../controllers/auth-controller");
const passport = require("../../../config/passport");

router.post("/signup", authController.signUp);
router.post(
  "/admin/signin",
  passport.authenticate("local", { session: false }),
  authController.admin_signIn
);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  authController.signIn
);

module.exports = router;
