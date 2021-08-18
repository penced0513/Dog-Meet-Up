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
        groupId: 1,
        }
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
