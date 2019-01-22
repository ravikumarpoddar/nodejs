const express= require('express');
const app = express();
const bodyparser = require('body-parser');
const publishRouter= require('./publish_api/routes/publisher');


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use('/subpublish',publishRouter);

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