const express = require('express');
const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



const libv = require('./router/videoLib');

app.use('/upload', libv);


module.exports = app;