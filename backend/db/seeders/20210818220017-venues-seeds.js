'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Venues', [
        {
          name: 'Waukegan Savanna Forest Preserve',
          address: "38820 N Delany Rd",
          city: "Wadsworth",
          state: "Illinois",
          zipCode:"60083",
        },
        {
          name: 'Beck Lake Dog Park',
          address: "1000 E River Rd",
          city: "Des Plaines",
          state: "Illinois",
          zipCode:"60016",
        },
        {
          name: 'Independence Grove Dog Park',
          address: "31531 N Milwaukee Ave",
          city: "Libertyville",
          state: "Illinois",
          zipCode:"60048",
        },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Venues', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
