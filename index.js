'use strict';

require('dotenv').config();

var app = {};
const Hapi = require('hapi');
app.server = new Hapi.Server();
app.server.connection({port: process.env.PORT});

require('./database')(app);

require('./app')(app);

app.server.start(err => {
  if(err) { throw err; }  

  console.log('Server is running at ', app.server.info.uri);
});
