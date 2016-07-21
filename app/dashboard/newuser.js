'use strict';

module.exports = app => {

  var db = app.db.mysql.db;

  var createUser = {
    method: 'GET',
    path: '/',
    handler: (req, res) => {

      db.users.findOrCreate({
        where: {
          username: 'eddy',
          email: 'eddy.rahman@thestar.com.my'
        }
      })
      .spread((user, created) => {
        res({
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
        });
      })
      .catch(err => {
        throw err;
      });

    }
  };

  return createUser;

}
