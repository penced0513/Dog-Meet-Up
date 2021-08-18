'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    owner: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    name: DataTypes.STRING,
  }, {});
  Pet.associate = function(models) {
    Pet.hasMany(models.Rsvp, {foreignKey: "petId"})
    Pet.belongsTo(models.User, {foreignKey: "owner"})
  };
  return Pet;
};
