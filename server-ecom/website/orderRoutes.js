let express = require("express");
const { saveOrder, paymentVerification } = require("../controler/websiteController/orderContoller");
let orderRoutes = express.Router();

orderRoutes.post('/order-save',saveOrder)


orderRoutes.post('/payment-verification',paymentVerification)
module.exports = {orderRoutes}