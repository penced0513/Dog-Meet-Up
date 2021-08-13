'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    owner: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
  };
  return Pet;
};