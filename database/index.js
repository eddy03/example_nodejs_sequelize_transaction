'use strict';

module.exports = app => {

  app.db = {};

  // What engine that we will be using

  // MySQL
  require('./mysql')(app);

}
