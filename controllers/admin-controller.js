const { User, Tweet, Followship, Like } = require("../models");

const adminController = {
  // 管理者可以瀏覽全站的 Tweet 清單
  getAllTweets: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
  // 管理者可以在清單上直接刪除任何人的推文
  deleteTweet: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
  // 管理者可以瀏覽站內所有的使用者清單
  getAllUsers: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
  // 新增管理者可以更改使用者權限
  // patchUserRole: async (req, res, next) => {},
};

module.exports = adminController;
