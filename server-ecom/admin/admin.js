let express = require("express");
const { category } = require("./categoryroute");
const { color } = require("./colorroute");
const { size } = require("./sizeroute");
const { story } = require("./storyroute");
const { slider } = require("./sliderroute");
const { subcategory } = require("./subcatroute");
const { productRoute } = require("./productRoute");
const { adminRoute } = require("./adminRoute");
const { checkAuth } = require("../middelwear/checkAuth");
let admin = express();



admin.get("/" , (req,res)=>{
    res.send("welcome  to admin panel");

})
admin.use("/" , adminRoute)
admin.use("/category",category)
admin.use("/subcat" , subcategory)
admin.use("/color" ,color)
admin.use("/size" , size)
admin.use("/story" , story)
admin.use("/slider",slider)
admin.use("/product" ,productRoute)

//in between them checkAuth is used the category is not added due to it i delete  checkAuth is a middelware

module.exports = {admin}