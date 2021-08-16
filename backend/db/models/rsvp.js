'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define('Rsvp', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER
  }, {});
  Rsvp.associate = function(models) {
    Rsvp.belongsTo(models.Event, {foreignKey: "eventId"} )
    Rsvp.belongsTo(models.User, {foreignKey: "userId"})
    Rsvp.belongsTo(models.Pet, {foreignKey: "petId"})
  };
  return Rsvp;
};
