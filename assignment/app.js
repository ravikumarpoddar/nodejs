const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

const writtenRouter=require('./assig_api/routes/written_Assignment');
app.use('/writtenAssign',writtenRouter);
//eror handling
app.use((req,res,next)=>{
    const error = new Error('Not found');
    Error.status=404;
    next(error);
});

app.use((err, req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:err.message
    });
});

module.exports= app;

