"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {}, {});
  Like.associate = function (models) {
    Like.belongsTo(models.Tweet, {
      foreignKey: "tweetId",
    });
    Like.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  Like.init(
    {
      userId: DataTypes.INTEGER,
      tweetId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
      tableName: "Likes",
      underscored: true,
    }
  );
  return Like;
};
