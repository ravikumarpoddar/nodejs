const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
    const token = req.headers.authorization.split(' ')[1]; // to use 2nd element of token 1st is Bearer
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next(); // call next if successfully auth-check else error
  } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

};