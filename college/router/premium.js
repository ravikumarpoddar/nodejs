const express = require('express');

const router = express.Router();

const PremiumControl = require('../controller/premiumController');

router.post('/premium/:id/:data', (req, res)=>{
    var data = req.params.data;
    var id = req.params.id;

    PremiumControl.MakePremium(req, res, data, id);
});

router.post('/retrive/:id', (req, res)=>{

    var id = req.params.id;

    PremiumControl.RetrivePremium(req, res, id);

});

module.exports = router;
