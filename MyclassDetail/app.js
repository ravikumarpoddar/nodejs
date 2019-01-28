const express = require('express');
const bodyparser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const classDetail = require('./router/myClass');

app.use('/myclassapi', classDetail);

module.exports = app;