var conn = require('../dbpool/db');

function GetStudName(id){
    conn.query('SELECT * from User_profile where id=?',[id], function (err, results, fields) {

        if (err) {
            
            callback(err, null)
        
        }else{
            var resultsJson = JSON.stringify(results);            
            resultsJson = JSON.parse(resultsJson);
            callback(null,resultsJson);
        }
            
    });
}

module.exports =  Dashboard = {

    getAllCollege: (req, res)=>{
         conn.query('SELECT * from College_profile', function (error, results, fields) {
            
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
            apiResult.totalColleges = resultJson.length;
            
          
            res.json(apiResult);
        });
    },

    getAllFaculty: (req, res)=>{
        conn.query('SELECT * from User_profile', function (error, results, fields) {
               
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
               apiResult.totalFaculties = resultJson.length;
               
             
               res.json(apiResult);
           });
    },

    getAllStudents: (req, res)=>{
        conn.query('SELECT * from Students', function (error, results, fields) {
            
            if (error) {
                
                var apiResult = {};
            
                apiResult.data = [];
                
                res.json(apiResult);
                
            }
            console.log(results);
            var resultJson = JSON.stringify(results);
           

            resultJson = JSON.parse(resultJson);

            for(let i=0; i<resultJson.length; i++){
                resultJson[i]["profile"] = []
                
            }
            var apiResult = {};

            apiResult.data = resultJson;
            apiResult.totalStudents = resultJson.length;
            
          
            res.json(apiResult);
        });
    },

    getAllSubject: (req, res)=>{
        conn.query('SELECT * from subject_repo', function (error, results, fields) {
            
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
            apiResult.totalSubject = resultJson.length;
            
          
            res.json(apiResult);
        });
    },

    getAllModule: (req, res)=>{
        conn.query('SELECT * from Module', function (error, results, fields) {
           
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
           apiResult.totalModules = resultJson.length;
           
         
           res.json(apiResult);
       });
    },

    getAllVideo: (req, res)=>{
        conn.query('SELECT * from video_mode_repo', function (error, results, fields) {
           
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
           apiResult.totalVideos = resultJson.length;
           
         
           res.json(apiResult);
       });
    },
};
