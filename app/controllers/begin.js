'use strict';

module.exports = app => {

  let NU = {}

  NU.begin = (req, res) => {

    app.db.tables.users.findOrCreate({
      where: {
        username: 'eddy',
        email: 'eddy.rahman@thestar.com.my'
      }
    })
      .spread((user, created) => {

        res.json({
          success: true,
          data: user,
          createdNew: created,
          links: {
            createNewPostWithoutTransaction: {
              fail: 'http://127.0.0.1:3001/newpost/without/fail',
              success: 'http://127.0.0.1:3001/newpost/without/success'
            },
            createNewPostWithTransaction: {
              fail: 'http://127.0.0.1:3001/newpost/with/fail',
              success: 'http://127.0.0.1:3001/newpost/with/success'
            }
          }
        })

      })
      .catch(err => {

        // do something with err

        res.status(500).json({
          success: false,
          msg: 'Whooo... Something wrong happen'
        })

      });

  }

  return NU

}
