const express = require('express');
const bodyparser = require('body-parser');
const logger = require('morgan');
const app = express();


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(logger('dev'));

// Require Packages
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const Dashboard = require('./router/dashboard');
const Entity = require('./router/entity');

app.use('/dashboard',Dashboard);
app.use('/entity', Entity)

module.exports = app;