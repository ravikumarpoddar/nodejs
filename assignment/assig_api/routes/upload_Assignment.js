const express= require('express');
const router = express.Router();
const controllerUpload=require('../controller/uploadAssignment');

//get method

router.get('/upload',controllerUpload.upload_Assignment);

router.get('/upload/:id',controllerUpload.upload_AssignmentByID);

module.exports=router;