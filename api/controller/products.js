const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get_all_product =  (req, res, next)=> {
    Product.find()
    .select('name price _id productImage') // it fetches only name price and id of field
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc =>{
                return {
                  name: doc.name,
                  price:doc.price,
                  _id: doc._id,
                    request : {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'+doc._id
                    } 
                }
            })
        };
        // if(docs.length >= 0){
             res.status(200).json(response);
        //   }else{
        //     res.status(404).json({
        //         message: "NO ENTRIES FOUND"
        //     });
        // }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
}
exports.post_product = (req, res, next) => {
    console.log(req.file);
const product= new Product({
_id: new mongoose.Types.ObjectId(),
name: req.body.name,
price: req.body.price,
productImage: req.file.path
});
product.save()
.then((result) => {
    console.log(result);
    res.status(200).json({
        message: "created product successfully",
        createProduct: {
           name: result.name,
           price: result.price,
           productImage: result.productImage,
          _id : result._id,
           request: {
               type: 'GET',
               url: 'http://localhost:3000/products/' +result._id
          } 
       }
    });
}).catch(err => {
    console.log(err);
    res.status(500).json({error : err});
});

}

exports.get_product_by_id = (req,res,next) => {
    const id = req.params.productId;
    Product.findById(id).select('name price _id productImage')
    .exec()
    .then(doc => {
        console.log("from dataBase :" ,doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: "GET_ALL_PRODUCTS",
                    url: 'http://localhost:3000/products/'
                }
            });
        } else {
            res.status(404).json({
                message: "No valid entry  for provided ID"
            })
        }
    
    }).catch(err=> {
        console.log(err);
        res.status(500).json({error: err});
        });
}
exports.update_product_by_id = (req,res,next) => {
    const id = req.params.productId;
    const updateOps = { };
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
      Product.update({_id : id}, {$set: updateOps}).exec()
      .then(result => {
          res.status(200).json({
              message: 'Products updated',
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/products/' +id
              }
          });
      }).catch(err => {
          console.log(err);
          res.status(404).json({
              error: err
          })
      });
    }

exports.delete_product_by_id =  (req,res,next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            meassage: "Product deleted",
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: {name: 'String', price: 'Number'}
            }
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
 }
