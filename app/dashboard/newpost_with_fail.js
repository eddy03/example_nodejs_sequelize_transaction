'use strict';

var async = require('async');

module.exports = app => {

  var db = app.db.mysql.db;

  var newPostWithFail = {
    method: 'GET',
    path: '/newpost/with/fail',
    handler: (req, res) => {

      return app.db.mysql.sequelize.transaction(t => {

        return db.posts.create({
          title: 'Hello Word',
          content: '<h1>Corn Flakes</h1>'
        }, {transaction: t})
          .then(post => {

            return db.users.findById(1, {transaction: t})
              .then(user => {

                // create undefined variable so that we can mimic node.js error
                undefinedVariable;

                return post.setAuthor(user, {transaction: t});
              });

          });

      })
      .then(results => {

        res({
          success: true,
          results: results,
          back: 'http://127.0.0.1:3001/'
        });

      })
      .catch(err => {
        throw err;
      });

    }
  }

  return newPostWithFail;

}
