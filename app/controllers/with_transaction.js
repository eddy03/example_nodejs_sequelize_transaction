'use strict'

module.exports = app => {

  let WT = {}

  WT.success = (req, res) => {

    return app.db.sequelize.transaction(t => {

      return app.db.tables.posts.create({
        title: 'Hello Word',
        content: '<h1>Corn Flakes</h1>'
      }, {transaction: t})
        .then(post => {

          return app.db.tables.users.findById(1, {transaction: t})
            .then(user => {
              return post.setAuthor(user, {transaction: t});
            });

        });

    })
      .then(results => {

        res.json({
          success: true,
          results: results,
          back: 'http://127.0.0.1:3001/'
        });

      })
      .catch(err => {
        // do something with err

        res.status(500).json({
          success: false,
          msg: 'Whooo... Something wrong happen',
          back: 'http://127.0.0.1:3001/'
        })
      });

  }

  WT.fail = (req, res) => {

    return app.db.sequelize.transaction(t => {

      return app.db.tables.posts.create({
        title: 'Hello Word',
        content: '<h1>Corn Flakes</h1>'
      }, {transaction: t})
        .then(post => {

          return app.db.tables.users.findById(1, {transaction: t})
            .then(user => {

              // create undefined variable so that we can mimic node.js error
              undefinedVariable;

              return post.setAuthor(user, {transaction: t});
            });

        });

    })
      .then(results => {

        res.json({
          success: true,
          results: results,
          back: 'http://127.0.0.1:3001/'
        })

      })
      .catch(err => {

        // do something with err

        res.status(500).json({
          success: false,
          msg: 'Whooo... Something wrong happen. You will see that no data will be inserted. Mean the transaction is working properly',
          back: 'http://127.0.0.1:3001/'
        })

      });

  }

  return WT

}