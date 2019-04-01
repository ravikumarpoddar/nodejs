const express = require('express');
const router = express.Router();
const conn = require('../model/dbpool');

function facultyId(id,cb){
    const sql = `select id from User_profile where colg_ID = ${id}`;
    conn.query(sql,(err,Id)=>{
        if(err){
            cb(err,null);
        }
        else{
            facultyIdJson=JSON.parse(JSON.stringify(Id));
            //console.log(facultyIdJson);
            cb(null,facultyIdJson);
            
        }
    });
}

function quizDetailsByID(id, cb){
    
    var sql = `SELECT COUNT(IF(type='Home',1,null)) 'Home',
    COUNT(IF(type='Class',1,null)) 'Class',
    COUNT(IF(login_id,1,null)) 'TotalQuiz'
    FROM Quiz Where login_ID= (select login_id from Quiz where login_id=${id})`;
    conn.query(sql,[id],(err,quiz)=>{
        if(err){
            cb(err,null);
        }
        else{
            quizJson=JSON.parse(JSON.stringify(quiz));
            
            cb(null,quizJson);
            //console.log(`QUIZ id:${id}`);
           // console.log(quizJson[0]);
        }
    });
}

function assignmentByID(id,cb){
    
    var sql = `SELECT COUNT(IF(type='written',1,null)) 'written',
    COUNT(IF(type='Uploader',1,null)) 'Uploader',
    COUNT(IF(login_id,1,null)) 'TotalAssignment'
    FROM Given_task Where login_ID=?`;
    conn.query(sql,[id],(err,assignment)=>{
       if(err) cb(err,null);
       else {
           assignmentJson=JSON.parse(JSON.stringify(assignment));
          // console.log(`assign id:${id}`);
          // console.log(assignmentJson);
           cb(null, assignmentJson);
       }
    });
}

function classByID(id,cb){
    
    var sql = `SELECT COUNT(IF(login_id,1,null)) 'No_Of_Class',
    COUNT(IF(status=100,1,null)) 'Completed'
    FROM class_new Where login_ID=?`;
    conn.query(sql,[id],(err,classdetail)=>{
       if(err) cb(err,null);
       else {
           classdetailJson=JSON.parse(JSON.stringify(classdetail));
          // console.log(`class id:${id}`);
           //console.log(classdetailJson);
           cb(null, classdetailJson);
       }
    });
}
router.get('/:id', (req,res)=>{
    const id = req.params.id;
    var noOfFaculty;
    const sql = 'select name from College_profile where id = ?';
    conn.query(sql,[id],(err,colg)=>{
     if(err){
         res.status(404).json({
             Error:err
         });   
     }
     else{
         resultJson=JSON.parse(JSON.stringify(colg));
         var apiResult = [];
        apiResult.report = resultJson[0];
         facultyId(id,(err,facId)=>{
             if(err) console.log(err);
             else{

                 for(let i=0;i<facId.length;i++){
                     //apiResult.report[i].totalFaculty = facId.length;
                   
                    console.log(facId[i].id);
                 facId[i]["Quiz"]=[];
                quizDetailsByID(facId[i].id,(err, quizdetail)=>{
                if(err){
                     console.log(err);
                 }
                 else{
                    // console.log(quizdetail);
                     facId[i].Quiz=quizdetail;
                    // console.log(facId[i]);
                     apiResult.push(facId[i]);

                     
                     if(facId.length -1 == i){
                  
                
                        res.json(apiResult);
                    }
                 }
                 });
                //  facId[i]["Assignment"]=[];
                //  assignmentByID(facId[i].id,(err,assign)=>{
                //      if(err){
                //          console.log(err);
                //      }
                //      else{
                //          facId[i].Assignment=assign;
                //       //apiResult.report[i]["Assignment"]=assign;
                //     console.log(facId[i].Assignment); 
                //     }
                //  });
                //  facId[i]["classDetail"]=[];
                //  classByID(facId[i].id,(err,classdet)=>{
                //     if(err){
                //         console.log(err);
                //     }
                //     else{
                //         //console.log(classdet);
                //         facId[i].classDetail=classdet;
                //         console.log(facId[i].classDetail);
                //    //apiResult.report[i]["Myclass"]=classdet;
                //     }
                //     //console.log(facId);
                // });

               
                 }
                 }
            
         });

      
       
         
     }
    })
});
module.exports=router;