const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




//here we don't need logout coz here we are never login we are just creating token
const User = require('../models/user')
router.post('/signup', (req, res, next)=>{
    // check if user is alredy cerated
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        // 422= "un processable entity, 409 = conflict with resource"
        if(user.length>=1) { // here we can't just use user as arg couse user never going to be null but empty array
            return res.status(409).json({
                message: "mail exists"
            });
        }else {
            // only execute if we don't have user for that email address
            bcrypt.hash(req.body.password  , 10, (err, hash)=>{
                if(err) {
                    return res.status(500).json({
                        error: err
                 });
                }else {
                    const user = new User({
                        _id : mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                        }); //here 10 is no. of salting rounds,don't ever store row password in database
                        // we will use node bcrypt.js package for hashing the password 
                       // salting: Add random string to planetext password before hashing
               user.save().then(result =>{
                   console.log(result);
                   res.status(201).json({
                       message: "User created"
                   });
               }).catch(err =>{
                   console.log(err);
                   res.status(500).json({
                       error: err
                   });
               });
             }
        
        
        });   
        }
    }); // don't need catch block coz we won't continue further. 
});

router.post('/login', (req,res, next) =>{
    User.find({
        email: req.body.email

    })
    .exec() // to get a real promise
    .then(user => {
        if (user.length < 1){
            return res.status(401).json({
                message: "email or password not matched"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result) => { //user[0] to access first element
            if(err) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            if(result){
             const token =  jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, process.env.JWT_KEY, 
                {
                   expiresIn: "1h" 
                });
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            }
            return res.status(401).json({ // if password didn't matched
                message: 'Authentication failed'
            });
        }); 
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ Error: err})
    });
});

router.get('/',(req, res)=>{
  User.find().exec().then((result)=> {res.status(200).json({
      result:result
  })
}).catch(err=>{
      console.log(err);
      res.status(404).json({
          message: "No user found in here"
      })
  })  

})

router.delete("/:userId", (req, res, next)=>{
    User.remove({
        _id: req.params.userId
    }).exec().then(result =>{
        res.status(200).json({
           message: "User Deleted" 
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
           error:err
        });
    });
});

module.exports = router;