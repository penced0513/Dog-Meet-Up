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
        img: "https://image.freepik.com/free-vector/life-is-better-with-friends-lettering_105554-210.jpg",
        description: "Hiking is always better with friends! Come join us, all dogs are welcome!",
        location: "Round Lake, IL",
        organizer: 1,
        },
        {
          name: "Hikers R Us",
          img: "https://www.urbanpethospital.com/blog/image.axd?picture=/hiking-with-dog.jpg",
          description: "We love going on long hikes. We would love some companions to come with us!",
          location: "Gurnee, IL",
          organizer: 3,
        },
        {
          name: "Lakes are the place",
          img: "https://media-be.chewy.com/wp-content/uploads/2017/07/28161001/dog-swimming-1440-1330x711.jpg",
          description: "We love to swim! Our dogs love to swim! Come swim with us!",
          location: "Round Lake, IL",
          organizer: 7,
        },
        {
          name: "lazyboys",
          img: "https://www.timeforpaws.co.uk/img/Dog-Sleeping.jpg",
          description: "Does your dog not have enough energy for the pups at the park? Our dogs are low strung dogs that still enjoy company. Join us!",
          location: "Springfield, IL",
          organizer: 5,
        },
        {
          name: "Running with dogs",
          img: "https://runningmagazine.ca/wp-content/uploads/2013/05/Dogs-and-people-running.jpg",
          description: "Our dogs love to run! They'd especially love running with you <3",
          location: "Chicago, IL",
          organizer: 1,
        },
        {
          name: "Beach Boyz",
          img: "https://d.newsweek.com/en/full/1438738/dog-beach.jpg?w=1600&h=1200&q=88&f=106c0742e7d607498f3e1a0fe521ef23",
          description: "Wanna chill on the beach? You know what to do...",
          location: "Zion, IL",
          organizer: 8,
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Groups', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
