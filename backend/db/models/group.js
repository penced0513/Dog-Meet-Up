'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    type: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    const columnMapping = {
      through: "UserGroups",
      foreignKey: "groupId",
      otherKey: "userId",
    }
    Group.belongsToMany(models.User, columnMapping)
  };
  return Group;
};
