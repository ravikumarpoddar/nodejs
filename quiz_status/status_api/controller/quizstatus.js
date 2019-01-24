const express = require('express');
const data = require('../model/Dbpool.js');

function AssginedBoard(id, aid, callback){
    var sql = "SELECT  section, stream, semester, created_time from student_board where quiz=? && assigne=?";
    data.query(sql,[id, aid],(err,result)=>{
        if(err){
            callback(err, null);
        }else{
            callback(null, result);
        }
    });
}

exports.quiz_status=(req,res,next)=>{
    const sql=`SELECT Q.link,U.id, U.name ,COUNT(IF(login_id,1,null)) 'TotalQuiz',
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
            var resultjson = JSON.stringify(result);
            resultjson = JSON.parse(resultjson);
            console.log(resultjson)
            for (let i = 0; i < resultjson.length; i++) {
                resultjson[i]["assign"]=[];

                AssginedBoard(resultjson[i].link,resultjson[i].id, (err, data)=>{
                    if(err){
                        console.log(err);
                    }else{
                        resultjson[i].assign = data
                    }

                    if(resultjson.length - 1 == i){
                        res.status(200).json({
                            "result":resultjson
                        }).end();
                    }
                });
                
            }
            
        }
    });
}