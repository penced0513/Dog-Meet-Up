'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    img: DataTypes.TEXT,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    organizer: DataTypes.INTEGER,
  }, {});
  Group.associate = function(models) {
    const columnMapping = {
      as: "joinedGroups",
      through: "UserGroups",
      foreignKey: "groupId",
      otherKey: "userId",
    }
    Group.belongsToMany(models.User, columnMapping)
    Group.hasMany(models.Event, {foreignKey: "categoryId"})
    Group.belongsTo(models.User, { foreignKey: "organizer"})
  };
  return Group;
};
