const express = require('express');
const bodyparser = require('body-parser');
const logger = require('morgan');
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(logger('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const Premium = require('./router/premium');

app.use('/college', Premium);

app.use((req,res,next)=>{
    const error=new Error('Not found');
    Error.status=404;
    console.error(error);
    next(error);
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:err.message
    });
});

module.exports = app;