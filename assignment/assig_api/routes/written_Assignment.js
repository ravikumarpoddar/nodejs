const express= require('express');
const router = express.Router();
const controllerWritten=require('../controller/writtenAssignment');
//get method

router.get('/written',controllerWritten.written_Assignment);

router.get('/written/:id',controllerWritten.written_AssignmentByID);

router.get('/written/faculty/:fid',controllerWritten.written_AssignmentByFacultyID);
module.exports=router;