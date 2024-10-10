let express = require("express");
const { addsize, viewsize, deletesize, deletemulti, editsize, updatesize } = require("../controler/sizecontroler");
let size = express.Router();

//add size route api
size.post("/insert" , addsize);

//view size route api
size.get("/view" , viewsize)
//delete size api
size.delete("/delete/:id" ,deletesize)
// delete multi api 

size.post("/deletemulti" , deletemulti)
//edit size api
size.get(`/edit/:id?` , editsize)
//update size api
size.put("/update/:id" , updatesize)

module.exports = {size}
