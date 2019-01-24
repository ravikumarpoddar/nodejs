const express=require('express');
const data = require('../model/Dbpool');

exports.module_isPublished=(req,res,next)=>{
    const id= req.body._id;
    const sub_id=req.body.sub_id;

    const sql=`update Module set isPublished = !isPublished where id = ${id} && sub_id=${sub_id}`;
    data.query(sql,(err,result)=>{
        if(err)
        res.status(404).json({
            error:err
        }).end();
        res.status(200).json({
            status:"OK"
        }).end();
     
    });
}