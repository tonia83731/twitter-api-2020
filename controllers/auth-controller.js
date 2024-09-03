const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// default avatar: https://imgur.com/lFKKzyL
// default cover: https://imgur.com/mfQASFc
const authController = {
  signUp: async (req, res, next) => {
    try {
      const { account, name, email, password, checkPassword } = req.body;
      console.log(account, name, email, password, checkPassword);
      if (!account || !name || !email || !password || !checkPassword)
        return res.status(401).json({
          status: "error",
          message: "account, name, email, password, checkPassword 不可空白",
        });
      if (name.length > 50)
        return res.status(401).json({
          status: "error",
          message: "name 不可超過50字",
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
      const hash = await bcrypt.hash(password, 10);
      await User.create({
        email,
        account,
        password: hash,
        name,
        avatar: "https://imgur.com/lFKKzyL",
        cover: "https://imgur.com/mfQASFc",
        role: "user",
      });
      return res.status(201).json({
        status: "success",
        message: "註冊成功!",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  signIn: async (req, res, next) => {
    try {
      const currUser = req.user.toJSON();
      delete currUser.password;
      const token = jwt.sign(currUser, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log(currUser);

      if (currUser.role !== "user")
        return res.status(404).json({
          status: "error",
          message: "帳號不存在！",
        });
      res.status(201).json({
        status: "success",
        message: "前台登入成功!",
        data: {
          token,
          user: currUser,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  admin_signIn: async (req, res, next) => {
    try {
      const currUser = req.user.toJSON();
      delete userData.password;
      const token = jwt.sign(currUser, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      if (currUser.role !== "admin")
        return res.status(404).json({
          status: "error",
          message: "帳號不存在！",
        });
      res.status(201).json({
        status: "success",
        message: "後台登入成功!",
        data: {
          token,
          user: currUser,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
