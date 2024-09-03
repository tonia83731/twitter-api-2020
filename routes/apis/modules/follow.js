const express = require("express");
const router = express.Router();
const followshipController = require("../../../controllers/followship-controller");

router.post("/:userId", followshipController.follow);
router.delete("/:userId", followshipController.unfollow);
router.get("/top5", followshipController.getTop5Follow);

module.exports = router;
