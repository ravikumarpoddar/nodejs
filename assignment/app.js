const express = require('express');
const app = express();
const logger = require('morgan');
const bodyparser = require('body-parser');


const writtenRouter=require('./assig_api/routes/written_Assignment');
app.use('/writtenAssign',writtenRouter);

const uploadRouter=require('./assig_api/routes/upload_Assignment');
app.use('/uploadAssign',uploadRouter);

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(logger('dev'));
//eror handling
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

