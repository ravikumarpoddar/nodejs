const conn = require('../model/Dbpool');
exports.feedback=(req,res,next)=>{
    sql = `select U.name, F.rating, F.feed from
    feedbacks F INNER JOIN User_profile U
    on F.login_id = U.id`;
    conn.query(sql,(err,feedback)=>{
        if(err){
            res.status(404).json({
               err:err 
            });
        }
        res.status(200).json({
            feedback:feedback
        });
    });
};