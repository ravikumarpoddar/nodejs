const mysql = require('mysql');

const connection=mysql.createConnection({
    host:'vrook.csrupgr2u2b1.ap-south-1.rds.amazonaws.com',
    user:'root',
    password:'vrook-vr',
    database:'vrookb2b'
});

connection.connect((err)=>{
    if(err)
    console.log('DB connection failed \n Error : '+JSON.stringify(err,undefined,2));
    else
    console.log('DB connected');
});


module.exports= connection;