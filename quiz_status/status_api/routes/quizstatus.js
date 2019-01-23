const express=require('express');
const router = express.Router();
const statusController= require('../controller/quizstatus');

/**
 * GET method to filter total no. of quiz, respective types(home or class), no. of quiz completed taken by particular faculty with name
 */

 router.get('/',statusController.quiz_status); 


module.exports=router;