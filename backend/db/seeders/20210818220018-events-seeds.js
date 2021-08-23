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
          categoryId: 2,
          name: "Off Leash!",
          date: new Date(Date.now() + 100000000),
          capacity: 100,
          description: "My puppy has been dying for some play time! Let's have a dog party where they can run around off leash and play to their heart's content.",
          img: "https://www.visit-massachusetts.com/adservimage/13829.jpg",
        },
        {
          hostId: 4,
          venueId: 1,
          categoryId: 3,
          name: "Lake House Party!",
          date: new Date(Date.now() + 80000000),
          capacity: 100,
          description: "I'm renting a big lake house for all my furry friends! Come swim!",
          img: "https://i.imgur.com/HEFA2dX.pngf",
        },
        {
          hostId: 5,
          venueId: 2,
          categoryId: 4,
          name: "Hang out",
          date: new Date(Date.now() + 900000000),
          capacity: 100,
          description: "Come chill, talk, sniff some butts.",
          img: "https://i.imgur.com/CTikdfZ.jpg",
        },
        {
          hostId: 6,
          venueId: 3,
          categoryId: 5,
          name: "RUN RUN RUN RUN RUN",
          date: new Date(Date.now() + 500000000),
          capacity: 100,
          description: "Got the zoomies? Get rid of em",
          img: "http://r.ddmcdn.com/s_f/o_1/w_1024/h_681/APL/uploads/2013/06/HowToBuildDogRun.jpg",
        },
        {
          hostId: 7,
          venueId: 1,
          categoryId: 6,
          name: "Beach Time!",
          date: new Date(Date.now() + 200000000),
          capacity: 100,
          description: "Come and join us in the sand. It'll be plenty of fun!",
          img: "https://i.imgur.com/zvkXBog.jpg",
        },
        {
          hostId: 8,
          venueId: 2,
          categoryId: 6,
          name: "Beach Time!",
          date: new Date(Date.now() + 100000000),
          capacity: 100,
          description: "Come and join us in the sand. It'll be plenty of fun!",
          img: "https://i.imgur.com/zvkXBog.jpg",
        },
        {
          hostId: 9,
          venueId: 1,
          categoryId: 3,
          name: "Lake House Party!",
          date: new Date(Date.now() + 40000000),
          capacity: 100,
          description: "I'm renting a big lake house for all my furry friends! Come swim!",
          img: "https://i.imgur.com/HEFA2dX.pngf",
        },
        {
          hostId: 1,
          venueId: 2,
          categoryId: 4,
          name: "Hang out",
          date: new Date(Date.now() + 900000000),
          capacity: 100,
          description: "Come chill, talk, sniff some butts.",
          img: "https://i.imgur.com/CTikdfZ.jpg",
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
