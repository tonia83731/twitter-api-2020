const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/user-controller");
const { multiuploads } = require("../../../middleware/multer");

// router.get("/:userId/tweets", userController.getUserTweets);
router.get("/:userId/tweets/like", userController.getUserTweetLikes);
router.get("/:userId/follower", userController.getUserFollower);
router.get("/:userId/following", userController.getUserFollowing);
router.get("/:userId", userController.getUser);
router.put("/:userId", multiuploads, userController.putUserInfo);
// router.put("/:userId", multiuploads, userController.putUser);
module.exports = router;
