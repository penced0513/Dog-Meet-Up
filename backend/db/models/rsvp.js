'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define('Rsvp', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER
  }, {});
  Rsvp.associate = function(models) {
    // associations can be defined here
  };
  return Rsvp;
};
