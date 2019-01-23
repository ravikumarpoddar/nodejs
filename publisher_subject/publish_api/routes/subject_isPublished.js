const express=require('express');
const router = express.Router();
const controller = require('../controller/subjectisPublished');
//const checkauth = require('../middlewere/check_auth');
//console.log(checkauth);
/**
 * POST method to check whether a particular subject is published or not by isPublished column of subject_repo Table
 */

router.post('/', controller.subject_isPublished);

module.exports=router;