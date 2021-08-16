'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    img: DataTypes.TEXT,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {});
  Group.associate = function(models) {
    const columnMapping = {
      through: "UserGroups",
      foreignKey: "groupId",
      otherKey: "userId",
    }
    Group.belongsToMany(models.User, columnMapping)
    Group.hasMany(models.Event, {foreignKey: "categoryId"})
  };
  return Group;
};
