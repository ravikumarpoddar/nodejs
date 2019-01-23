const conn = require('../dbpool/db');

function getVideoDetailByID(id){
  
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
            resultJson.count = resultJson;

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
            
          

            for(let i=0;i<resultJson.length;i++){
              
              

                conn.query('SELECT * from video_encoded where id=?',[resultJson[i].video_link], function (error, results, fields) {
        
                    if (error) {
                        
                        var apiResult = {};
                    
                        apiResult.data = [];
            
                        apiResult;
                 
                    }
                    
                    var resultsJson = JSON.stringify(results);            
                    resultsJson = JSON.parse(resultsJson);

                    console.log(resultsJson[0]);
                    
                    videoResult[i] = resultsJson[0];
                    
                    
                });

            }

            console.log(videoResult.length);
            for(let i=0; i<videoResult.length ;i++){
                console.log(videoResult[i]);
            }
            
            var apiResult = {};

            apiResult.data = resultJson;
            apiResult.totalVideo = resultJson.length;
            
          
            res.json(apiResult);
        });
    },



}