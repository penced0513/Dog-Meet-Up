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
          description: "I am taking my good boy out on a hike. We would love all of you to join us. Let's have some fun!",
          img: "https://static.getmatcha.com/image/upload/s--36SUB1oA--/f_auto,q_auto,t_rr_large_traditional/dra3m6bglsbhshaumtwn.jpg",
        },
        {
          hostId: 2,
          venueId: 1,
          categoryId: 1,
          name: "Meet and Greet!",
          date: new Date(Date.now() + 400000000),
          capacity: 100,
          description: "I just got a new puppy and want to get him socialized! Please join us, so he can make some new friends :).",
          img: "https://iheartdogs.com/wp-content/uploads/2017/08/2.jpg",
        },
        {
          hostId: 3,
          venueId: 1,
          categoryId: 1,
          name: "Off Leash!",
          date: new Date(Date.now() + 100000000),
          capacity: 100,
          description: "My puppy has been dying for some play time! Let's have a dog party where they can run around off leash and play to their heart's content.",
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
