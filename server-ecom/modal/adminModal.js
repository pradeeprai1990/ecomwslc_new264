let mongoose = require("mongoose");

let adminSchema = new mongoose.Schema(
    {
    adminName:{
        type : String,
        required:true,
    },
    adminPassword:{
        type : String,
        required:true,
    },
  

    adminStatus:{
        type: String,
        default:1
    }
},
{
    timestamps:true,
})
let adminmodal = mongoose.model("Admin" , adminSchema);
module.exports = {adminmodal};