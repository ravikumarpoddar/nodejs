const express = require('express');
const r = express.Router();

const ClassController = require('../controller/MyclassController');

r.get('/facultyclass/:id', (req, res, next)=>{
    var fid = req.params.id;

    ClassController.getClassDetailByID(req, res, fid);

});
r.get('/facultyclassdetail/:id', (req, res, next)=>{
    var fid = req.params.id;

    ClassController.getClassDetailByFacultyID(req, res, fid);

});

module.exports = r;