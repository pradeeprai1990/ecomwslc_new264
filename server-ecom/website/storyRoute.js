let express = require("express");
const { story } = require("../controler/websiteController/storyControler");
let storyRoute = express.Router();
storyRoute.get("/addstory" , story)
//http://localhost:8000/website/story/addstory

module.exports = {storyRoute}