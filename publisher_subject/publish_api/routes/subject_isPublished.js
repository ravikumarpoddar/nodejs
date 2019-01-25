const express=require('express');
const router = express.Router();
const controller = require('../controller/subjectisPublished');
//const checkauth = require('../middlewere/check_auth');

/**
 * POST method to check whether a particular subject is published or not by isPublished column of subject_repo Table
 */

router.post('/subject', controller.subject_isPublished);

module.exports=router;