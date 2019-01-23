const express= require('express');
const data = require('../model/Dbpool');
const router = express.Router();

//get method
router.get('/written', (req,res,next)=>{
    const sql=`select id,login_id,name,date from
            Given_task where type='written'`;

    data.query(sql,(err,result)=>{
        if(err){
            res.status(404).json({
                error:err
            });
        }
        else{
            res.status(200).json({
                result:result
            });
        }
    });
});
module.exports=router;