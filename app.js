const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
const bodyParser =  require('body-parser'); // used to parse the body of incoming req doesn't support files but supports urlencoded and json data
const logger = require('morgan');  // logger middleware morgan is used to tell express to funnal all the req through this middleware, 
// morgan then log something and let the req  continue, morgan call next function but it doesn't 
// return res but tell next to continue there work, use it before we handle our req with our routes


mongoose.connect('mongodb://localhost:27017/shoppingRestfulApi', {useNewUrlParser: true},()=>{
    console.log("database has been connected successfully");
});

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.Promise = global.Promise; // it's default nodejs promise implementaion, to fix deprication message
app.use(logger('dev'));
app.use('/upload',express.static('uploads',));
app.use( bodyParser.urlencoded({extended:false})) ;// true used to parse extended body, rich data in it, false for simple body
app.use(bodyParser.json());// extract json data and make it easily readable
//CORS: cross origin resource sharing: In restful api client and server are not same server, so   browser don't allow the access to that server data, so we need to disable it
// here we need to send right header back, we need to do before out routes
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');// * mean access to all if we need to restrict to particular link put it instad of * like:  'http://my-cool-page.com' but in resful api we give access to any client
    res.header('Access-Control-Allow-header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // here we can put * for all header
 // method is property gives access to with http method used,  Browser always sends OPTIONS req first, when u send http req
    if(req.method === 'OPTIONS'){
     res.header('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE, GET, POST'); // http methos you want to support with ur api
     return res.status(200).json({});
    }
  next(); // used coz if not returning  immediately due to options req then, so other routes can take over
})



app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);



// Error handling handle every req which reaches this line means not routes above able to handle the req
app.use((req, res, next) => { 
    const error = new Error('not Found'); // Error object available by default no need to import 
    error.status=404; // coz we only get here when we don't be able to get the fitting routes
    next(error); // this will forward the error request instead of original one

});
// this will handle all kinds of error (that we created above and pass next()) or error thrown from anywhere else in this appllication
app.use((error, req, res, next)=>{
 res.status(error.status || 500);
 res.json({
     error: {
         message: error.message
     }
 });
});

// use as da method sets up middleware n incoming req has to go through app's use mothod
// app.use((req,res,next)=>{ // next is a func used to move the req to next middleware in line, use method works for any http methods
//      res.status(200).json({ 
//          message: "It works in here"
//      })
// })

module.exports = app;
