"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tweets", "deleted_at", {
      type: Sequelize.DATE,
      // allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tweets", "deleted_at");
  },
};
