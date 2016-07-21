'use strict';

var async = require('async');

module.exports = app => {

  var db = app.db.mysql.db;

  var createPostWithoutFail = {
    method: 'GET',
    path: '/newpost/without/fail',
    handler: (req, res) => {

      async.auto({
        createPost: cb => {

          db.posts.create({
            title: 'Hello Word',
            content: '<h1>Corn Flakes</h1>'
          })
            .then(post => { cb(null, post); })
            .catch(err => { cb(err); });

        },
        findAuthor: cb => {

          db.users.findById(1)
            .then(user => { cb(null, user); })
            .catch(err => { cb(err); })

        },
        relationToAuthor: ['createPost', 'findAuthor', (results, cb) => {

          // create undefined variable so that we can mimic node.js error
          undefinedVariable;

          results.createPost.setAuthor(results.findAuthor)
            .then(() => { cb(); })
            .catch(err => { cb(err); });

        }]
      }, (err, results) => {
        if(err) { throw err; }

        res({
          success: true,
          data: results.createPost,
          back: 'http://127.0.0.1:3001/'
        });
      });

    }
  };

  return createPostWithoutFail;

}
