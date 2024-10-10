let express = require("express");
const { Slider } = require("../controler/websiteController/sliderControler");
let sliderRoute = express.Router();

sliderRoute.get("/addslider" , Slider)
//http://localhost:8000/website/slider/addslider
module.exports = {sliderRoute}