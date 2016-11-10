'use strict'

// Load the .env to process.env
require('dotenv').config()

const express = require('express')
const app = express()

require('./db')(app)

let BeginCtrl = require('./app/controllers/begin')(app)
let WTCtrl = require('./app/controllers/with_transaction')(app)
let WhTCtrl = require('./app/controllers/without_transaction')(app)

// Routing
app.get('/', BeginCtrl.begin)

app.get('/newpost/without/fail', WhTCtrl.fail)
app.get('/newpost/without/success', WhTCtrl.success)
app.get('/newpost/with/fail', WTCtrl.fail)
app.get('/newpost/with/success', WTCtrl.success)

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log('The nodejs sequelize transaction example is running on ' + process.env.APP_HOST + ':' + process.env.APP_PORT)
})