const express = require("express");
const router = express.Router();
const adminController = require("../../../controllers/admin-controller");

router.delete("/tweets/:tweetId", adminController.deleteTweet);
router.patch("/users/:userId", adminController.patchUserRole);
router.get("/tweets", adminController.getAllTweets);
router.get("/users", adminController.getAllUsers);

module.exports = router;
