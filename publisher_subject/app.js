const express= require('express');
const app = express();
const logger = require('morgan');
const bodyparser = require('body-parser');


const subjectPublishedRouter= require('./publish_api/routes/subject_isPublished');
const modulePublishedRouter= require('./publish_api/routes/module_isPublished');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/subjectPublished',subjectPublishedRouter);
app.use('/modulePublished',modulePublishedRouter);

app.use ((req,res,next)=>{
    const error = new Error('not found');
    Error.status = 404;
    next(error);
});

app.use((error,req,res,next)=> {
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
});
module.exports = app;