const express = require('express');
const bodyparser = require('body-parser');
const logger = require('morgan');
const app = express();


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(logger('dev'));

// Require Packages

const Dashboard = require('./router/dashboard');
const Entity = require('./router/entity');

app.use('/dashboard',Dashboard);
app.use('/entity', Entity)

module.exports = app;