const data = require('../model/Dbpool.js');

function AssginedBoard(id, aid, callback){
    var sql = "SELECT  section, stream, semester, created_time from student_board where quiz=? && assigne=?";
    data.query(sql,[id, aid],(err,result)=>{
        if(err){
            callback(err, null);
        }else{
            var resultjson= JSON.parse(JSON.stringify(result));
            callback(null, resultjson);
        }
    });
}
function QuizLink(id,callback) {
    var sql ="select link from Quiz where id = ?";  
    data.query(sql,[id],(err,result)=>{
        if(err){
            callback(err, null);
        }else{
            var resJson=JSON.parse(JSON.stringify(result));
            console.log(resJson );
            callback(null, resJson);
        }   
    });
}
exports.upload_Assignment = (req,res,next) => {

    const sql=`select G.id,U.id as Faculty_id, U.name Faculty_name, C.name College,  
    G.name as Assignment,DATE_FORMAT(G.created_time, "%M %d %Y") as date
    from Given_task G INNER JOIN User_profile U on G.login_id=U.id
    Inner Join College_profile C on U.colg_ID = C.id 
      where type = 'Uploader'`;
  
    data.query(sql,(err,result)=>{
       
        if(err){
            res.status(404).json({
                error:err
            });
        }
        else{
            var resultjson = JSON.stringify(result);
            resultjson = JSON.parse(resultjson);
            //console.log(resultjson)
            for (let i = 0; i < resultjson.length; i++) {

                resultjson[i]["assign"]=[];

                const link= QuizLink(resultjson[i].Faculty_id,(err,data)=>{
                    if(err) throw err;
                    else return data;
                });

                AssginedBoard(link,resultjson[i].Faculty_id, (err, data)=>{
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
exports.upload_AssignmentByID = (req,res,next) => {
    const id=req.params.id;

    const sql=`select U.name Faculty_name, C.name College,  
    G.name as Assignment,DATE_FORMAT(G.created_time, "%M %d %Y") as date
    from Given_task G INNER JOIN User_profile U on G.login_id=U.id
    Inner Join College_profile C on U.colg_ID = C.id 
    where type = 'Uploader' && G.id=${id}`;
  
    data.query(sql,(err,result)=>{
       
        if(err){
            res.status(404).json({
                error:err
            });
        }
        else{
            var resultjson = JSON.stringify(result);
            resultjson = JSON.parse(resultjson);
            console.log(resultjson.length);
            resultjson[0]["assign"]=[];
            const link=QuizLink(resultjson[0].Faculty_id,(err,data)=>{
                        if(err) throw err;
                        else {
                        console.log("data"+data);
                        return data;
            }
                    });
                    AssginedBoard(link,resultjson[0].Faculty_id, (err, data)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    resultjson[0].assign = data
                                }
            
                            res.json(resultjson).end;
                                    // res.status(200).json({
                                    //     "result":resultjson
                                    // }).end();
                                
                            });
            // for (let i = 0; i < resultjson.length; i++) {
            //     resultjson[i]["assign"]=[];
            //     const link=QuizLink(resultjson[i].Faculty_id,(err,data)=>{
            //         if(err) throw err;
            //         else return data;
            //     });
            //     AssginedBoard(link,resultjson[i].Faculty_id, (err, data)=>{
            //         if(err){
            //             console.log(err);
            //         }else{
            //             resultjson[i].assign = data
            //         }

            //         if(resultjson.length - 1 == i){
            //             res.status(200).json({
            //                 "result":resultjson
            //             }).end();
            //         }
            //     });
            // } 
           
            }
        });
 }
 exports.upload_AssignmentByFacultyID = (req,res,next) => {
    const id=req.params.fid;

    const sql=`select U.name Faculty_name, C.name College,  
    G.name as Assignment,DATE_FORMAT(G.created_time, "%M %d %Y") as date
    from Given_task G INNER JOIN User_profile U on G.login_id=U.id
    Inner Join College_profile C on U.colg_ID = C.id 
    where type = 'Uploader' && U.id=${id}`;
  
    data.query(sql,(err,result)=>{
       
        if(err){
            res.status(404).json({
                error:err
            });
        }
        else{
            var resultjson = JSON.stringify(result);
            resultjson = JSON.parse(resultjson);
            
            for (let i = 0; i < resultjson.length; i++) {
                resultjson[i]["assign"]=[];
                const link=QuizLink(resultjson[i].Faculty_id,(err,data)=>{
                    if(err) throw err;
                    else return data;
                });
                AssginedBoard(link,resultjson[i].Faculty_id, (err, data)=>{
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