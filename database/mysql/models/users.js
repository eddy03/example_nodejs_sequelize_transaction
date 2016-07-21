'use strict';

module.exports = (sequelize, DataTypes) => {

  var users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING(100)
    },
    email: {
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'users',
    classMethods: {
      associate: models => {
        users.hasMany(models.posts, {as: 'posts', constrains: false});
      }
    }
  });

  return users;

}
