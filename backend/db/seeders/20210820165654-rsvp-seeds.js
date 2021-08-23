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
        },
        {
          eventId: 2,
          userId: 1,
        },
        {
          eventId: 10,
          userId: 5,
        },
        {
          eventId: 10,
          userId: 4,
        },
        {
          eventId: 9,
          userId: 2,
        },
        {
          eventId: 9,
          userId: 5,
        },
        {
          eventId: 9,
          userId: 8,
        },
        {
          eventId: 8,
          userId: 2,
        },
        {
          eventId: 8,
          userId: 3,
        },
        {
          eventId: 8,
          userId: 5,
        },
        {
          eventId: 7,
          userId: 4,
        },
        {
          eventId: 7,
          userId: 6,
        },
        {
          eventId: 6,
          userId: 8,
        },
        {
          eventId: 6,
          userId: 9,
        },
        {
          eventId: 6,
          userId: 10,
        },
        {
          eventId: 5,
          userId: 1,
        },
        {
          eventId: 5,
          userId: 2,
        },
        {
          eventId: 5,
          userId: 3,
        },
        {
          eventId: 4,
          userId: 5,
        },
        {
          eventId: 2,
          userId: 2,
        },
        {
          eventId: 3,
          userId: 3,
        },
        {
          eventId: 4,
          userId: 4,
        },
        {
          eventId: 5,
          userId: 5,
        },
        {
          eventId: 6,
          userId: 6,
        },
        {
          eventId: 7,
          userId: 7,
        },
        {
          eventId: 8,
          userId: 8,
        },
        {
          eventId: 9,
          userId: 9,
        },
        {
          eventId: 10,
          userId: 1,
        },
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
