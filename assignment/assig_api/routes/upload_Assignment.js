const express= require('express');
const router = express.Router();
const controllerUpload=require('../controller/uploadAssignment');

//get method

router.get('/upload',controllerUpload.upload_Assignment);

router.get('/upload/:id',controllerUpload.upload_AssignmentByID);

router.get('/upload/faculty/:fid',controllerUpload.upload_AssignmentByFacultyID);
module.exports=router;