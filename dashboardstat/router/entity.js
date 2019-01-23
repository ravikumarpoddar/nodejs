const express = require('express');
const r = express.Router();

const EntityController = require('../controller/entitycontroller');

r.get('/college/:id', (req, res, next)=>{
    var cid = req.params.id;
    console.log(cid);
    EntityController.getCollegeByID(req, res, cid);
});

r.get('/faculty/:id', (req, res, next)=>{
    var fid = req.params.id;
    EntityController.getFacultyByID(req, res, fid);
});

module.exports = r;