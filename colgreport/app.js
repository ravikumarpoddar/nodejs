const express = require('express');
const app = express();
const logger = require('morgan');
const bodyparser = require('body-parser');


const reportrouter=require('./reportapi/routes/report.routes');
app.use('/report',reportrouter);

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(logger('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use((req,res,next)=>{
    const error = new Error('Not found');
    Error.status=404;
    console.log(error);
    next(error);
});
app.use((err, req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:err.message
    });
});

module.exports= app;

