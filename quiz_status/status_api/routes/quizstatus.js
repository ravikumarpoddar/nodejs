const express=require('express');
const router = express.Router();
const statusController= require('../controller/quizstatus');

/**
 * GET method to filter total no. of quiz, respective types(home or class), no. of quiz completed taken by particular faculty with name
 */

 router.get('/allquiz',statusController.quiz_status); 
 
  router.get('/:id',statusController.quiz_statusById);

module.exports=router;