const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productController = require('../controller/products')
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination: function(req, file , cb) {
     cb(null, './uploads');
    },
    filename: function (req, file, cb) {
     cb(null,new Date().toISOString() +file.originalname)
    }
});

const fileFilter = (req, file, cb) =>{
    // accept by
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp'){
    cb(null, true);
    } else {
    // reject file and throw error here
    cb(new Error("File format not supported" ), false);
    }
};
const upload = multer({
    // dest: 'uploads/',  // '/uploads/' leads to relative path here
   storage: storage,
   limits: { fileSize: 1024*1024*5 }, // upto 5 MB 
   fileFilter: fileFilter
 });
 
router.get('/', productController.get_all_product);
// we don't need return here coz there is no code running after response
// re turn only required when we have any other code after the response, but sending 2 response is not a good idea
router.post('/', checkAuth, upload.single('productImage'), productController.post_product);

router.get('/:productId', productController.get_product_by_id);


router.patch('/:productId',checkAuth, productController.update_product_by_id);


router.delete('/:productId',checkAuth, productController.delete_product_by_id);


module.exports = router;