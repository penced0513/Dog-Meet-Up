'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('UserGroups', [
        {
        userId: 1,
        groupId: 4,
        },
        {
          userId: 1,
          groupId: 2,
        },
        {
          userId: 1,
          groupId: 1,
        },
        {
          userId: 2,
          groupId: 4,
        },
        {
          userId: 2,
          groupId: 5,
        },
        {
          userId: 2,
          groupId: 6,
        },
        {
          userId: 3,
          groupId: 2,
        },
        {
          userId: 3,
          groupId: 4,
        },
        {
          userId: 3,
          groupId: 6,
        },
        {
          userId: 4,
          groupId: 1,
        },
        {
          userId: 4,
          groupId: 3,
        },
        {
          userId: 4,
          groupId: 5,
        },
        {
          userId: 5,
          groupId: 1,
        },
        {
          userId: 5,
          groupId: 2,
        },
        {
          userId: 5,
          groupId: 3,
        },
        {
          userId: 5,
          groupId: 4,
        },
        {
          userId: 5,
          groupId: 5,
        },
        {
          userId: 5,
          groupId: 6,
        },
        {
          userId: 6,
          groupId: 3,
        },
        {
          userId: 6,
          groupId: 5,
        },
        {
          userId: 6,
          groupId: 1,
        },
        {
          userId: 7,
          groupId: 1,
        },
        {
          userId: 3,
          groupId: 2,
        },
        {
          userId: 7,
          groupId: 3,
        },
        {
          userId: 5,
          groupId: 4,
        },
        {
          userId: 1,
          groupId: 5,
        },
        {
          userId: 8,
          groupId: 6,
        },
    ], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('UserGroups', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
