const { User, Followship } = require("../models");

const followshipController = {
  // 使用者可以追蹤/取消追蹤其他使用者
  follow: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const followerId = req.user.id;
      if (followerId === +userId)
        return res.status(401).json({
          status: "error",
          message: "不能follow自己!",
        });
      const [user, followship] = await Promise.all([
        User.findByPk(userId),
        Followship.findOne({
          where: {
            followingId: userId,
            followerId,
          },
        }),
      ]);
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "使用者不存在!",
        });
      if (followship)
        return res.status(404).json({
          status: "error",
          message: "已追蹤此使用者!",
        });
      const following = await Followship.create({
        followerId,
        followingId: userId,
      });
      return res.status(201).json({
        status: "success",
        message: "追蹤使用者成功",
        following,
      });
    } catch (error) {
      next(error);
    }
  },
  unfollow: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const followerId = req.user.id;
      const [user, followship] = await Promise.all([
        User.findByPk(userId),
        Followship.findOne({
          where: {
            followingId: userId,
            followerId,
          },
        }),
      ]);
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "使用者不存在!",
        });
      if (!followship)
        return res.status(404).json({
          status: "error",
          message: "未追蹤此使用者!",
        });
      await followship.destroy();
      return res.status(201).json({
        status: "success",
        message: "退追使用者成功",
      });
    } catch (error) {
      next(error);
    }
  },
  // 更新: 使用者能在首頁的側邊欄，看見跟隨者 (followers) 數量排列前 10 的推薦跟隨名單
  getTop5Follow: async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      let userData = users.map((u) => ({
        ...u.toJSON(),
        followerCounts: u.Followers.length,
        Followers: undefined,
      }));
      userData = userData.sort((a, b) => b.followerCounts - a.followerCounts);
      userData = userData.slice(0, 5);
      return res.status(201).json({
        status: "success",
        users: userData,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = followshipController;
