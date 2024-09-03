"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tweets", [
      {
        user_id: 9,
        description:
          "Just tried matcha for the first time today. Not sure what the hype is all about. 😅",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        description:
          "Just finished a 500-page novel in two days! I’m exhausted but so satisfied. 📚",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        description:
          "Spent all night debugging just to realize it was a missing semicolon. 😅 #ProgrammerProblems",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        description:
          "Just finished my first 10K run! Feeling amazing and exhausted at the same time. 🏃‍♂️ #RunnersHigh",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        description:
          "Sadness, I just want Riley to be happy. Why do you keep making her sad?",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tweets", {});
  },
};
