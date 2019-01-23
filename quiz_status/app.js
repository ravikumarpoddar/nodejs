const express=require('express');
const app = express();

const bodyparser= require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

const statusRoutes= require('./status_api/routes/quizstatus');
app.use('/quizstat',statusRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    Error.status=404;
    next(error);
});

app.use((err, req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:err.message
    });
});

module.exports=app;

