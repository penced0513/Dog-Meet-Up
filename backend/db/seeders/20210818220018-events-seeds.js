'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Events', [
        {
          hostId: 1,
          venueId: 1,
          categoryId: 1,
          name: "Dog hikes!",
          date: new Date(Date.now() + 700000000),
          capacity: 100,
          img: "https://static.getmatcha.com/image/upload/s--36SUB1oA--/f_auto,q_auto,t_rr_large_traditional/dra3m6bglsbhshaumtwn.jpg",
        },
        {
          hostId: 2,
          venueId: 1,
          categoryId: 1,
          name: "Meet and Greet!",
          date: new Date(Date.now() + 400000000),
          capacity: 100,
          img: "https://iheartdogs.com/wp-content/uploads/2017/08/2.jpg",
        },
        {
          hostId: 3,
          venueId: 1,
          categoryId: 1,
          name: "Off Leash!",
          date: new Date(Date.now() + 100000000),
          capacity: 100,
          img: "https://www.visit-massachusetts.com/adservimage/13829.jpg",
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Events', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
