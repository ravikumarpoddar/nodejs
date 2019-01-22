const express=require('express');
const router = express.Router();
const data = require('../model/index')
const checkauth = require('../middlewere/check_auth');

 router.post('/',(req,res,next)=>{

    const id= req.body.uid;
    //!(select isPublish from subject_repo where id = ${id})
    const sql = `update subject_repo set isPublished = true where id = ${id}`;
   
    data.query(sql,(err,result)=>{
        console.log(result);
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