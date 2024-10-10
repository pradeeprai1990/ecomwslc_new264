let express = require("express");
const { subcat } = require("../controler/websiteController/subcatController");
let subcatRoute = express.Router();
subcatRoute.get("/addsubcat" , subcat)
//website/subcat/addsubcat
module.exports = {subcatRoute}