const express= require('express');
const router= express.Router();
const controller= require('../controller/feedback.controller');


router.get('/',controller.feedback);
module.exports= router;