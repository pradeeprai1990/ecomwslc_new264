let express = require("express");
const { register, verifyOTP, login } = require("../controler/websiteController/registerController");
let registerRoute = express.Router();
registerRoute.post('/register' , register)
registerRoute.post('/verify' , verifyOTP)
registerRoute.post('/login' , login)
//parent category routes
module.exports = {registerRoute}

//http://localhost:8000/website/user/register