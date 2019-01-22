const express=require('express');
const router = express.Router();
const data = require('../model/index')
const checkauth = require('../middlewere/check_auth');

 router.post('/',(req,res,next)=>{
    const sub_id=req.body.sub_id;
    const id= req.body._id;
    const sql=`update Module set isPublished = !isPublished where id = ${id} && sub_id=${sub_id}`;
    data.query(sql,(err,result)=>{
        if(err)
        res.status(404).json({
            "err":err
        }).end();

        res.status(200).json({
            status:"OK"
        }).end();
     
    });
});


module.exports=router;