let mongoose = require("mongoose");

let storyname = new mongoose.Schema(
    {
    storyName:{
        type : String,
        required:true,
    },
    storyDes:{
        type : String,
        required:false,
    },
    storyImage:{
        type : String,
        required:true,
    },
    bannerImage:{
        type : String,
        required:true,
    },
    storyStatus:{
        type : Boolean,
        default:1
    }
},
{
    timestamps:true,
})
let storymodal = mongoose.model("story" , storyname);
module.exports = {storymodal}