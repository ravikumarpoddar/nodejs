const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // to create an ID
const checkAuth = require('../middleware/check-auth');
const Order = require('../models/order');

const OrdersController = require('../controller/orders')

router.get('/',checkAuth, OrdersController.get_all_orders);

// 201 every thing was successful resource created

router.post('/',checkAuth ,OrdersController.post_order);
router.get('/:orderId', checkAuth, OrdersController.get_order_by_id);
router.delete('/:orderId', checkAuth, OrdersController.delete_order_by_id);


// router.patch('/:orderId', checkAuth, (req, res, next)=> {
//     res.status(200).json({
//             message: "Orders were fatched Patch request by ID",
//             orderId: req.params.orderId
//     })
// });


module.exports = router;