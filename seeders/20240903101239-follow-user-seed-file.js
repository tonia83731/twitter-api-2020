"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM Users;",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert(
      "Followships",
      Array.from({ length: 20 }, () => {
        let follower_id, following_id;
        do {
          follower_id = users[Math.floor(Math.random() * users.length)].id;
          following_id = users[Math.floor(Math.random() * users.length)].id;
        } while (follower_id === following_id);

        return {
          follower_id,
          following_id,
          created_at: new Date(),
          updated_at: new Date(),
        };
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Followships", {});
  },
};
