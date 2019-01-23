const express = require('express');
const r = express.Router();

const dashController = require('../controller/DashBoardcontroller');

r.get('/statcolg', (req, res, next) =>{
   dashController.getAllCollege(req, res); 
});

r.get('/statfaculty', (req, res, next)=>{
    dashController.getAllFaculty(req, res);
});

r.get('/statmodule', (req, res, next)=>{
    dashController.getAllModule(req, res);
});

r.get('/statsubject', (req, res, next)=>{
    dashController.getAllSubject(req, res);
});

r.get('/statvideo', (req, res, next)=>{
    dashController.getAllVideo(req, res);
});

module.exports = r;