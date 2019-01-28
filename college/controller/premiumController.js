const conn = require('../dbpool/db');
var datetime = new Date();
module.exports = Premium = {
    

    MakePremium: (req, res,data,id)=>{
        conn.query(`update College_profile set isPremieum = ?,updated_Time=?, refcolg=? where id = ${id}`,[true,datetime, data] ,function (error, results, fields) {
               
               if(error){
                  res.status(404).json({
                      "Status":"Not Updated"
                  });
               }else{
                res.status(200).json({
                    "Status":"Updated"
                });
               }
           });
    },
    RetrivePremium: (req, res,id)=>{
        conn.query(`update College_profile set isPremieum = ?,updated_Time=? where id = ${id}`,[false,datetime] ,function (error, results, fields) {
               
            if(error){
                res.status(404).json({
                    "Status":"Not Updated"
                });
             }else{
              res.status(200).json({
                  "Status":"Updated"
              });
             }
           });
    },
}