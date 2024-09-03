const { User, Tweet, Followship, Like, Reply } = require("../models");

const tweetController = {
  // 使用者能在首頁瀏覽所有的推文
  getTweets: async (req, res, next) => {
    try {
      const tweets = await Tweet.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["id", "account", "avatar"],
          },
        ],
      });
      return res.status(201).json({
        status: "success",
        tweets,
      });
    } catch (error) {
      next(error);
    }
  },
  // 使用者點擊貼文方塊時，能查看貼文與回覆串
  getTweet: async (req, res, next) => {
    try {
      const { tweetId } = req.params;
      const tweet = await Tweet.findByPk(tweetId, {
        include: [
          {
            model: User,
            attributes: ["id", "account", "avatar"],
          },
          {
            model: Reply,
            attributes: ["comment"],
            include: [
              {
                model: User,
                attributes: ["id", "account", "avatar"],
              },
            ],
          },
        ],
      });

      if (!tweet)
        return res.status(404).json({
          status: "error",
          message: "推文不存在!",
        });
      const tweetData = tweet.toJSON();
      return res.status(201).json({
        status: "success",
        tweet: tweetData,
      });
    } catch (error) {
      next(error);
    }
  },
  // 使用者能新增推文
  postTweet: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { description } = req.body;

      if (!description)
        return res.status(401).json({
          status: "error",
          message: "推文不能為空白",
        });
      if (description.length > 140)
        return res.status(401).json({
          status: "error",
          message: "字數超出上限！description 不可超過140字!",
        });
      const newTweet = await Tweet.create({
        userId,
        description,
      });
      return res.status(201).json({
        status: "success",
        message: "推文新增成功",
        tweet: newTweet,
      });
    } catch (error) {
      next(error);
    }
  },
  // getTweet: async (req, res, next) => {},
  // 新增: 使用者能 修改 推文
  putTweet: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { tweetId } = req.params;
      const { description } = req.body;
      const tweet = await Tweet.findByPk(tweetId);

      if (!tweet)
        return res.status(404).json({
          status: "error",
          message: "推文不存在",
        });
      if (!description)
        return res.status(401).json({
          status: "error",
          message: "推文不能為空白",
        });
      if (description.length > 140)
        return res.status(401).json({
          status: "error",
          message: "字數超出上限！description 不可超過140字!",
        });
      if (userId !== tweet.userId)
        return res.status(401).json({
          status: "error",
          message: "沒有修改權限!",
        });
      const [updateTweet, _] = await Promise.all([
        tweet.update({
          userId,
          description,
        }),
        tweet.increment("edit_count", { by: 1 }),
      ]);

      return res.status(201).json({
        status: "success",
        message: "推文更新成功!",
        tweet: updateTweet,
      });
    } catch (error) {
      next(error);
    }
  },
  // 使用者能回覆別人的推文
  postReply: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { tweetId } = req.params;
      const { comment } = req.body;
      if (!comment)
        return res.status(401).json({
          status: "error",
          message: "回覆不能為空白",
        });
      const tweet = await Tweet.findByPk(tweetId);
      if (!tweet)
        return res.status(404).json({
          status: "error",
          message: "推文不存在",
        });
      const newReply = await Reply.create({
        userId,
        tweetId: +tweetId,
        comment,
      });
      return res.status(201).json({
        status: "success",
        message: "回覆新增成功",
        tweet: newReply,
      });
    } catch (error) {
      next(error);
    }
  },
  // 新增: 使用者能 修改 回覆別人的推文
  // putReply: async (req, res, next) => {
  //   try {
  //     const userId = req.user.id;
  //     const { tweetId } = req.params;
  //     const { comment } = req.body;
  //     if (!comment)
  //       return res.status(401).json({
  //         status: "error",
  //         message: "回覆不能為空白",
  //       });
  //     const tweet = await Tweet.findByPk(tweetId);
  //     if (!tweet)
  //       return res.status(404).json({
  //         status: "error",
  //         message: "推文不存在",
  //       });
  //     if (userId !== tweet.userId)
  //       return res.status(401).json({
  //         status: "error",
  //         message: "沒有修改權限!",
  //       });
  //   } catch (error) {}
  // },
  // 使用者能對別人的推文按 Like/Unlike
  likedTweet: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { tweetId } = req.params;

      const [tweet, like] = await Promise.all([
        Tweet.findByPk(tweetId),
        Like.findOne({
          where: {
            userId,
            tweetId,
          },
        }),
      ]);
      if (!tweet)
        return res.status(404).json({
          status: "error",
          message: "推文不存在!",
        });
      if (like)
        return res.status(404).json({
          status: "error",
          message: "推文已按like!",
        });
      const newLike = await Like.create({
        userId,
        tweetId,
      });
      return res.status(201).json({
        status: "success",
        message: "推文like成功",
        like: newLike,
      });
    } catch (error) {
      next(error);
    }
  },
  unLikedTweet: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { tweetId } = req.params;
      const [tweet, like] = await Promise.all([
        Tweet.findByPk(tweetId),
        Like.findOne({
          where: {
            userId,
            tweetId,
          },
        }),
      ]);
      if (!tweet)
        return res.status(404).json({
          status: "error",
          message: "推文不存在!",
        });
      if (!like)
        return res.status(404).json({
          status: "error",
          message: "推文未按like!",
        });
      await like.destroy();
      return res.status(201).json({
        status: "success",
        message: "推文unlike成功",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = tweetController;
