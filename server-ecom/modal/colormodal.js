let mongoose = require("mongoose");

let colorname = new mongoose.Schema(
    {
    colorName:{
        type : String,
        required:true,
    },
    colorCode:{
        type : String,
        required:true,
    },
  

    colorStatus:{
        type : Boolean,
        default:1
    }
},
{
    timestamps:true,
})
let colormodal = mongoose.model("color" , colorname);
module.exports = {colormodal};