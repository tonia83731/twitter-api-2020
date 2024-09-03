const express = require("express");
const router = express.Router();
const auth = require("./modules/auth");
const user = require("./modules/user");
const tweet = require("./modules/tweet");
const followship = require("./modules/follow");
const admin = require("./modules/admin");
const {
  authenticated,
  authenticateAdmin,
  authenticateUser,
} = require("../../middleware/api-auth");
const { apiErrorHanlder } = require("../../middleware/error-handler");

router.use("/", auth);
router.use("/users", authenticated, authenticateUser, user);
router.use("/admin", authenticated, authenticateAdmin, admin);
router.use("/tweets", authenticated, authenticateUser, tweet);
router.use("/followship", authenticated, authenticateUser, followship);
router.use("/", apiErrorHanlder);
module.exports = router;
