let express = require("express");
const { admin } = require("../controler/adminController");
let adminRoute = express.Router();
adminRoute.post("/login" , admin);
module.exports = {adminRoute}