'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Pets', [
        {
        owner: 1,
        breed: "Australian Shepherd / Golden Retriever",
        weight: 50,
        image: "https://i.imgur.com/YENoUue.jpg",
        name: "Luke"
        },
        {
          owner: 1,
          breed: "Australian Shepherd / Golden Retriever",
          weight: 50,
          image: "https://i.imgur.com/FrifRTR.jpg",
          name: "Luke2"
          },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Pets',null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
