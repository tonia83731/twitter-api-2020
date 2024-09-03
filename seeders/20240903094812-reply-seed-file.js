"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Replies", [
      {
        user_id: 12,
        tweet_id: 7,
        comment:
          "It’s an acquired taste! Give it a few more tries, and you might start liking it. #matchafan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        tweet_id: 7,
        comment:
          "Try it with a bit of honey or in a latte! That might change your mind. 🍵",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        tweet_id: 7,
        comment:
          "Matcha is packed with antioxidants—great for your health! Maybe the benefits will win you over. 💪",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 9,
        tweet_id: 7,
        comment:
          "Thanks for the tips, everyone! I’ll definitely give it another shot. Maybe I’ll try a matcha latte next. 😄",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        tweet_id: 8,
        comment:
          "Wow, that’s impressive! What book was it? #BookRecommendations",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 13,
        tweet_id: 8,
        comment: "That’s some serious dedication! Any favorite parts?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        tweet_id: 8,
        comment:
          "It was The Night Circus! The imagery was stunning. My favorite part was the magical duels between the two main characters. 🪄",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        tweet_id: 9,
        comment:
          "Ugh, I’ve been there! The smallest things always cause the biggest headaches.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 8,
        tweet_id: 9,
        comment:
          "It’s always the semicolons! 😂 Hope you got some sleep after that.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        tweet_id: 9,
        comment:
          "Barely, but the code is running smoothly now, so it’s all worth it. Thanks for the support, fellow coders!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        tweet_id: 10,
        comment:
          "Congrats! That’s a huge milestone. What’s next? A half marathon? 😉",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 8,
        tweet_id: 10,
        comment:
          "That’s incredible! Make sure to rest up and treat yourself—you earned it!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        tweet_id: 10,
        comment:
          "Thank you! A half marathon might be in the future, but for now, a big breakfast and a nap sound perfect. 🥞😴",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        tweet_id: 11,
        comment:
          "I don't know, Joy. I don't want to make her sad. I just... I can't help it. Sometimes she needs to feel sad.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        tweet_id: 11,
        comment: "But why? Why can't we just focus on the happy memories?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        tweet_id: 11,
        comment:
          "Because life isn't always happy, Joy. Sometimes, feeling sad is what helps Riley deal with the hard things.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        tweet_id: 11,
        comment:
          "It lets her know it's okay to miss things, to be vulnerable. And sometimes, after feeling sad, she can feel better.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Replies", {});
  },
};
