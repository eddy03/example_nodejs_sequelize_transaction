'use strict';

module.exports = (sequelize, DataTypes) => {

  var postmeta = sequelize.define('postmeta', {
    key: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'postmeta',
    classMethods: {
      associate: models => {
        postmeta.belongsTo(models.posts, {as: 'post', constrains: false});
      }
    }
  });

  return postmeta;

}
