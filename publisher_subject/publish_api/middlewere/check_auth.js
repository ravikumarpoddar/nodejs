const jwt =require('jsonwebtoken');
module.exports= (req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, 'ravi');
        console.log("user auth & verifyed");
        req.userData = decode;
        next();
    }
    catch(error){
        return res.status(401).json({
            message:"auth failed"
        });
    }
}