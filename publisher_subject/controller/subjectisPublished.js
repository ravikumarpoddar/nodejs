const express = require('express');
const data = require('../model/Dbpool');

exports.subject_isPublished=(req,res,next)=>{

    const id= req.body.uid;
    const sql=`update subject_repo set isPublished = !isPublished where id = ${id}`;
    data.query(sql,(err,result)=>{
        if(err)
        res.status(404).json({
            "err":err
        }).end();

        res.status(200).json({
            status:"OK"
        }).end();
     
    });
}