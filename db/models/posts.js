'use strict';

module.exports = (sequelize, DataTypes) => {

  var posts = sequelize.define('posts', {
    title: DataTypes.STRING(500),
    content: DataTypes.TEXT
  }, {
    tableName: 'posts',
    classMethods: {
      associate: models => {
        posts.hasMany(models.postmeta, {as: 'postmeta', constrains: false});
        posts.belongsTo(models.users, {as: 'author', foreignKey: 'user_id', constrains: false});
      }
    }
  });

  return posts;

}
