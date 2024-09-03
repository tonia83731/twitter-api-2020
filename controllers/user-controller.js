const { User } = require("../models");

const userController = {
  getUser: async (req, res, next) => {},
  getUserTweets: async (req, res, next) => {},
  getUserTweetLikes: async (req, res, next) => {},
  getUserFollower: async (req, res, next) => {},
  getUserFollowing: async (req, res, next) => {},
  // 使用者能編輯自己的 account、name、email 和 password
  putUserAuth: async (req, res, next) => {},
  // 使用者能編輯自己的名稱、自我介紹、個人頭像與封面
  putUser: async (req, res, next) => {},
};

module.exports = userController;
