'use strict';

module.exports = app => {

  var createUser = require('./newuser')(app);
  var createPostWithoutSuccess = require('./newpost_without_success')(app);
  var createPostWithoutFail = require('./newpost_without_fail')(app);
  var createPostWithSuccess = require('./newpost_with_success')(app);
  var createPostWithFail = require('./newpost_with_fail')(app);

  app.server.route([
    createUser,
    createPostWithoutSuccess,
    createPostWithSuccess,
    createPostWithoutFail,
    createPostWithFail
  ]);

}
