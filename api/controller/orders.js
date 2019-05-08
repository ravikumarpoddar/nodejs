const Order = require("../models/order");
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_all_orders =   (req, res, next)=> {
    Order.find()
    .select("product quantity _id")
    .populate('product','name')  // to combine data(order with detail product details)
    .exec() // help to turn into real promise
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc =>{
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                     request: {
                         type: 'GET',
                         url: 'http://localhost:3000/orders/' +doc._id
                  }
                }
            })
        })
    })
 }

 exports.post_order = (req, res, next) =>{
    // first check if there exist exist product with that particular id
    Product.findById(req.body.productId)
    .then(product =>{
        if(!product) {
            return res.status(404).json({
                message: "Product Not found"
            });
        }
    const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId
    });
    return order.save();
}).then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Order Stored',
            createdOrder: {
            _id: result._id,
            product:result.product,
            quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' +result._id
            }
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            erroe: err
        });
    });
   
}
exports.get_order_by_id = (req, res, next)=> {
    Order.findById(req.params.orderId)
    .populate('product') // must be before exec() 
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url:'http://localhost:3000/orders/'
            }
        });
    }).catch(err =>{
        res.status(500).json({
           error : err
        });
    });
}

exports.delete_order_by_id = (req, res, next)=> {
    Order.remove({
        _id: req.params.orderId
    }).exec().then(result =>{
    res.status(200).json({
      message: 'Order  Deleted',
       request: {
           type: 'POST',
           url:'http://localhost:3000/orders/',
           body: {
               productId: 'ID',
               quantity: "NUmber"
           }
       }
   });
   }).catch(err =>{
       res.status(500).json({
          error : err
       });
   })
   }