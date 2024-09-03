const { User } = require("../models");

const followshipController = {
  // 使用者可以追蹤/取消追蹤其他使用者
  follow: async (req, res, next) => {},
  unfollow: async (req, res, next) => {},
  // 更新: 使用者能在首頁的側邊欄，看見跟隨者 (followers) 數量排列前 10 的推薦跟隨名單
  getTop5Follow: async (req, res, next) => {},
};

module.exports = followshipController;
