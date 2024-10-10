let express = require("express");
const { addProduct, productData, productDetail } = require("../controler/websiteController/productController");
let productRoute = express.Router();
//add product route
productRoute.get("/parentCategory" , addProduct)
productRoute.get("/product-data/:slug" , productData)
productRoute.get("/product-details/:id" , productDetail)

//website/product/addproduct
module.exports = {productRoute}