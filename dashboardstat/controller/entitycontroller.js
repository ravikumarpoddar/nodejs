var conn = require('../dbpool/db');

module.exports =  CollegeByID = {

    getCollegeByID: (req, res, id)=>{
       
      conn.query(`SELECT * from College_profile where id=${id}`, function (error, results, fields) {
            
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
            
            
          
            res.json(apiResult);
        });
    },
    getFacultyByID: (req, res, id)=>{
        conn.query('SELECT * from User_profile where id=?', [id], function (error, results, fields) {
            
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
            
            
          
            res.json(apiResult);
        });
    },
    getFacultyBycolg: (req, res, id)=>{
        conn.query('SELECT * from User_profile where colg_ID=?', [id], function (error, results, fields) {
            
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
            apiResult.totalFaculty = resultJson.length;
            
          
            res.json(apiResult);
        });
    },
};
