'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Groups', [
        {
        name: "Better With Friends",
        img: "https://secure.meetupstatic.com/photos/event/5/f/f/600_497341535.jpeg",
        description: "Hiking is alawys better with friends! Come join us, all dogs are welcome!",
        location: "Round Lake, IL"
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Groups', null, {});
  }
};
