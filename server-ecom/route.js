let express = require("express");
const { admin } = require("./admin/admin");
const { website } = require("./website/website");
let route = express();
// route.get("/",(req,res)=>{
//     res.send("hello world")
// })


route.use("/admin" , admin)
route.use("/website" , website)
module.exports = {route}