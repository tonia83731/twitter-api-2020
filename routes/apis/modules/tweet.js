const express = require("express");
const router = express.Router();
const tweetController = require("../../../controllers/tweet-controller");

router.post("/:tweetId/reply", tweetController.postReply);
router.put("/:tweetId/reply", tweetController.putReply);
router.post("/:tweetId/like", tweetController.likedTweet);
router.delete("/:tweetId/like", tweetController.unLikedTweet);
router.get("/:tweetId", tweetController.getTweet);
router.post("/:tweetId", tweetController.postTweet);
router.put("/:tweetId", tweetController.putTweet);
router.get("/", tweetController.getTweets);
module.exports = router;
