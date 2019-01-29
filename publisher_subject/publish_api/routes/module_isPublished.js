const express = require('express');
const router = express.Router();
const controller = require('../controller/moduleisPublished');
//const checkauth = require('../middlewere/check_auth');
/** 
 * POST method to check whether a particular module is published or not by isPublished column of Module Table
*/
router.post('/module', controller.module_isPublished);

router.post('/isfree', controller.module_isFree);

router.post('/remfree', controller.module_removeFree);

module.exports = router;