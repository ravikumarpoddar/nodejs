const express=require('express');
const router = express.Router();
const controller = require('../controller/moduleisPublished');
//const checkauth = require('../middlewere/check_auth');
/** 
 * POST method to check whether a particular module is published or not by isPublished column of Module Table
*/
 router.post('/', controller.module_isPublished);

module.exports = router;