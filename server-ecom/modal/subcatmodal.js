let mongoose = require("mongoose");

let subcatname = new mongoose.Schema(
    {
    subcategoryName:{
        type : String,
        required:true
    },
    subcategoryDes:{
        type : String,
        required:false
    },
    parentcategory:{
        type:mongoose.Types.ObjectId,
       ref: "parentcategory" // reference to category collection by id
      
    },
    categoryImage:{
        type : String,
        required:false
    },
    subcategoryStatus:{
        type : Boolean,
        default:1
    }
},
{
    timestamps:true,
})
let subcatmodal = mongoose.model("subcategory" , subcatname);
module.exports = {subcatmodal};