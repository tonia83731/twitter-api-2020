const { User, Tweet, Followship, Like, Reply } = require("../models");

const tweetController = {
  // 使用者能在首頁瀏覽所有的推文
  getTweets: async (req, res, next) => {},
  // 使用者點擊貼文方塊時，能查看貼文與回覆串
  getTweet: async (req, res, next) => {},
  // 使用者能新增推文
  postTweet: async (req, res, next) => {},
  // 新增: 使用者能 修改 推文
  putTweet: async (req, res, next) => {},
  // 使用者能回覆別人的推文
  postReply: async (req, res, next) => {},
  // 新增: 使用者能 修改 回覆別人的推文
  putReply: async (req, res, next) => {},
  // 使用者能對別人的推文按 Like/Unlike
  likedTweet: async (req, res, next) => {},
  unLikedTweet: async (req, res, next) => {},
};

module.exports = tweetController;
