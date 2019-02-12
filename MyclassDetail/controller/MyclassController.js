const conn = require('../dbpool/db');

function getVideoDetailByFacultyID(id, callback){
   
    conn.query('SELECT * from video_encoded where id=?',[id], function (err, results, fields) {

        if (err) {
            
            callback(err, null)
        
        }else{
            var resultsJson = JSON.stringify(results);            
            resultsJson = JSON.parse(resultsJson);
            callback(null,resultsJson);
        }
            
    });

   
}

module.exports = ClassDetailByID = {
    
    getClassDetailByID: (req, res, id)=>{
        conn.query('SELECT * from class_new where login_id=?',[id], function (error, results, fields) {
            
            if (error) {
                
                var apiResult = {};
            
                apiResult.data = [];
                
                res.json(apiResult);
                
            }
            
            var resultJson = JSON.stringify(results);
            // resultJson.count = resultJson;

            resultJson = JSON.parse(resultJson);
            var apiResult = {};

            apiResult.data = resultJson;
            apiResult.totalClass = resultJson.length;
            
          
            res.json(apiResult);
        });
    },
    getClassDetailByFacultyID: (req, res, id)=>{
        var videoResult =[];
        conn.query('SELECT * from class_video where myclass_id=?',[id], function (error, results, fields) {
            
            if (error) {
                
                var apiResult = {};
            
                apiResult.data = [];
                
                res.json(apiResult);
                
            }
            
            var resultJson = JSON.stringify(results);
            
            resultJson.count = resultJson;

            resultJson = JSON.parse(resultJson);
            
            

            
            for(let i = 0;i<resultJson.length;i++){
             resultJson[i]["vidDetail"] = [];
             getVideoDetailByFacultyID(resultJson[i].video_link,(err, data)=>{

                if(err){
                    console.log(err);
                }else{
                    resultJson[i].vidDetail = data;
                }
                
                if(resultJson.length - 1 == i){

                    var apiResult = {};

                    apiResult.data = resultJson;
                    apiResult.totalVideo = resultJson.length;
                    
                  
                    res.json(apiResult);

                }
                
             });

               

            }
           
        });
    },

   



}