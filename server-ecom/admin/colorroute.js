let express = require("express");
const { addcolor, viewcolor, deletecolor, deletemulti, editcolor, updatecolor } = require("../controler/colorcontroller");

let color = express.Router();
//insert color route api
color.post("/insert" , addcolor);
//view  color route api
color.get("/view" , viewcolor)
//delete color api
color.delete("/delete/:id" , deletecolor)
// delete multi api 
color.post("/deletemulti" , deletemulti)
//edit color api
color.get(`/edit/:id?` , editcolor)
//update color api
color.put("/update/:id" , updatecolor)
module.exports = {color}