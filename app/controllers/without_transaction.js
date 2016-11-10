'use strict'

const async = require('async')

module.exports = app => {

  let WhT = {}

  WhT.success = (req, res) => {

    async.auto({
      createPost: cb => {

        app.db.tables.posts.create({
          title: 'Hello Word',
          content: '<h1>Corn Flakes</h1>'
        })
          .then(post => { cb(null, post); })
          .catch(err => { cb(err); });

      },
      findAuthor: cb => {

        app.db.tables.users.findById(1)
          .then(user => { cb(null, user); })
          .catch(err => { cb(err); })

      },
      relationToAuthor: ['createPost', 'findAuthor', (results, cb) => {

        results.createPost.setAuthor(results.findAuthor)
          .then(() => { cb(); })
          .catch(err => { cb(err); });

      }]
    }, (err, results) => {
      if(err) {

        // do something with err

        res.status(500).json({
          success: false,
          msg: 'Whooo... Something wrong happen',
          back: 'http://127.0.0.1:3001/'
        })

      } else {

        res.json({
          success: true,
          data: results.createPost,
          back: 'http://127.0.0.1:3001/'
        });

      }

    });

  }

  WhT.fail = (req, res) => {

    async.auto({
      createPost: cb => {

        app.db.tables.posts.create({
          title: 'Hello Word',
          content: '<h1>Corn Flakes</h1>'
        })
          .then(post => { cb(null, post); })
          .catch(err => { cb(err); });

      },
      findAuthor: cb => {

        app.db.tables.users.findById(1)
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
      if(err) {

        // do something with err

        res.status(500).json({
          success: false,
          msg: 'Whooo... Something wrong happen',
          back: 'http://127.0.0.1:3001/'
        })

      } else {

        res.json({
          success: true,
          data: results.createPost,
          back: 'http://127.0.0.1:3001/'
        });

      }

    });

  }

  return WhT;

}