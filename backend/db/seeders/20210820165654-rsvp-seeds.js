'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Rsvps', [
        {
          eventId: 1,
          userId: 1,
          petId: 1,
        },
        {
          eventId: 2,
          userId: 1,
          petId: 1,
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Rsvps', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
