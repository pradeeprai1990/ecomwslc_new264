let express = require("express");
const { saveOrder } = require("../controler/websiteController/orderContoller");
let orderRoutes = express.Router();

orderRoutes.post('/order-save',saveOrder)

module.exports = {orderRoutes}