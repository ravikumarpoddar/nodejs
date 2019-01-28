const mysql = require('mysql');
const conn = mysql.createConnection({
    host:'vrook.csrupgr2u2b1.ap-south-1.rds.amazonaws.com',
    user:'root',
    password:'vrook-vr',
    database:'vrookb2b'
});
 
 conn.connect((err)=>{
    if(err){
       console.log('Database is not connected \n ERROR :'+JSON.stringify(err,undefined,2));
        }
        else{
            console.log("Database connected sucessfully");
        }
    
});
module.exports=conn;