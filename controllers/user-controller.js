const { User, Tweet } = require("../models");
const bcrypt = require("bcryptjs");
const { imgurFileHandler } = require("../helpers/file-helpers");
const userController = {
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        include: [Tweet],
      });
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "使用者不存在!",
        });
      const userData = user.toJSON();
      delete userData.password;
      return res.status(201).json({
        status: "success",
        user: userData,
      });
    } catch (error) {
      next(error);
    }
  },
  // getUserTweets: async (req, res, next) => {},
  getUserTweetLikes: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Tweet,
            as: "LikedTweets",
            include: [
              {
                model: User,
                attributes: ["id", "name", "account", "avatar"],
              },
            ],
          },
        ],
        attributes: ["id"],
      });
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "使用者不存在",
        });
      return res.status(201).json({
        status: "success",
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  getUserFollower: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: User,
            as: "Followers",
            attributes: ["id", "name", "account", "avatar"],
          },
        ],
        attributes: ["id"],
      });
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "使用者不存在",
        });
      return res.status(201).json({
        status: "success",
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  getUserFollowing: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: User,
            as: "Followings",
            attributes: ["id", "name", "account", "avatar"],
          },
        ],
        attributes: ["id"],
      });
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "使用者不存在",
        });
      return res.status(201).json({
        status: "success",
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  // 使用者能編輯自己的 account、name、email 和 password
  // 使用者能編輯自己的名稱、自我介紹、個人頭像與封面
  putUserInfo: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { account, name, email, password, introduction, checkPassword } =
        req.body;
      const { files } = req;
      const avatar = files?.avatar
        ? await imgurFileHandler(files.avatar[0])
        : null;
      const cover = files?.cover
        ? await imgurFileHandler(files.cover[0])
        : null;
      if (name && name.length > 50)
        return res.status(401).json({
          status: "error",
          message: "字數超出上限！name 不可超過50字!",
        });
      if (introduction && introduction > 160)
        return res.status(401).json({
          status: "error",
          message: "字數超出上限！introduction 不可超過160字!",
        });
      if (password !== checkPassword)
        return res.status(401).json({
          status: "error",
          message: "password, checkPassword 不同",
        });
      const [checkedAccount, checkedEmail] = await Promise.all([
        User.findOne({
          where: {
            account,
          },
        }),
        User.findOne({
          where: {
            email,
          },
        }),
      ]);

      if (checkedAccount)
        return res.status(401).json({
          status: "error",
          message: "account 已重複註冊！",
        });
      if (checkedEmail)
        return res.status(401).json({
          status: "error",
          message: "email 已重複註冊！",
        });
      const user = await User.findByPk(userId);
      if (!user)
        return res.status(404).json({
          status: "error",
          message: "使用者不存在",
        });
      let hash = user.password;
      if (password) hash = await bcrypt.hash(password, 10);

      let updateUser = await user.update({
        account: account || user.account,
        name: name || user.name,
        email: email || user.email,
        password: hash,
        introduction: introduction || user.introduction,
        avatar: avatar || user.avatar,
        cover: cover || user.cover,
      });

      updateUser = updateUser.toJSON();
      delete updateUser.password;

      return res.status(201).json({
        status: "success",
        message: "更新成功",
        user: updateUser,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
