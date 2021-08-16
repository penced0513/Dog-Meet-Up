'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    capacity: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Group, {foreignKey: "categoryId"})
    Event.belongsTo(models.User, {foreignKey: "hostId"})
    Event.belongsTo(models.Venue, {foreignKey: "venueId"})
    Event.hasMany(models.Rsvp, {foreignKey: "eventId"} )
  };
  return Event;
};
