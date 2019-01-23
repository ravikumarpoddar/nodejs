const express = require('express');
const data = require('../model/Dbpool.js');

exports.quiz_status=(req,res,next)=>{

    const sql=`SELECT U.name ,COUNT(IF(login_id,1,null)) 'TotalQuiz',
                      COUNT(IF(type='Home',1,null)) 'Home',
                      COUNT(IF(type='Class',1,null)) 'Class',
                      COUNT(IF(completed=1,1,null)) 'QuizCompleted'
                      FROM Quiz as Q INNER JOIN
                      User_profile as U ON
                      Q.login_id = U.id
                       GROUP BY login_id`;
    data.query(sql,(err,result)=>{
        if(err){
            res.status(404).json({
             "error":err
            }).end();
        }
        else{
            res.status(200).json({
                "result":result
            }).end();
        }
    });
}