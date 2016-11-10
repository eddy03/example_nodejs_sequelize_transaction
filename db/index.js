'use strict';

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = app => {

  let db = {}

  const sequelize = new Sequelize(process.env.DB_MYSQL_NAME, process.env.DB_MYSQL_USERNAME, process.env.DB_MYSQL_PASSWORD, {
    host: process.env.DB_MYSQL_HOST,
    dialect: 'mariadb',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    define: {
      underscored: true
    }
  });

  fs.readdirSync(path.join(__dirname, 'models'))
    .filter(file => {
      return file.indexOf(".") !== 0 && file !== 'index.js'
    })
    .forEach(file => {
      var model = sequelize.import(path.join(__dirname, 'models', file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });


  sequelize.sync({force: (process.env.DB_MYSQL_SYNC === 'true')});

  app.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    tables: db
  }

}
