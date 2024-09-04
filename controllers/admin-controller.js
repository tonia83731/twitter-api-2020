const { User, Tweet, Followship, Like } = require("../models");

const adminController = {
  // 管理者可以瀏覽全站的 Tweet 清單
  getAllTweets: async (req, res, next) => {
    try {
      const tweets = await Tweet.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "account", "avatar"],
          },
        ],
        paranoid: false,
      });
      const tweetsData = tweets.map((t) => ({
        ...t.toJSON(),
        description:
          t.description.length > 50
            ? t.description.substring(0, 50) + "..."
            : t.description,
      }));
      tweetsData.sort((a, b) => b.createdAt - a.createdAt);
      return res.status(201).json({
        status: "success",
        tweets: tweetsData,
      });
    } catch (error) {
      next(error);
    }
  },
  // 管理者可以在清單上直接刪除任何人的推文
  deleteTweet: async (req, res, next) => {
    try {
      const { tweetId } = req.params;
      const tweet = await Tweet.findByPk(tweetId);
      if (!tweet)
        return res.status(404).json({
          status: "error",
          message: "推文不存在!",
        });
      await tweet.destroy();
      // console.log(updateDelete);
      return res.status(201).json({
        status: "success",
        message: "推文已刪除",
        // updateDelete,
      });
    } catch (error) {
      next(error);
    }
  },
  // 管理者可以瀏覽站內所有的使用者清單
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Tweet,
            include: [{ model: User, as: "LikedUser" }],
            attributes: ["id"],
          },
          { model: User, as: "Followers", attributes: ["id"] },
          { model: User, as: "Followings", attributes: ["id"] },
        ],
      });
      let usersData = users.map((u) => {
        const likedTweets = u.Tweets.map((item) => {
          return item.LikedUser.length;
        });
        const likedTweetsCount = likedTweets.reduce((count, tweet) => {
          return count + tweet;
        }, 0);
        // console.log(likedTweetsCount);
        return {
          ...u.toJSON(),
          tweetCounts: u.Tweets.length,
          followerCounts: u.Followers.length,
          followingCounts: u.Followings.length,
          likedTweetsCount,
          Followers: undefined,
          Followings: undefined,
          Tweets: undefined,
        };
      });
      usersData.sort((a, b) => b.tweetCounts - a.tweetCounts);
      return res.status(201).json({
        status: "success",
        users: usersData,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = adminController;
