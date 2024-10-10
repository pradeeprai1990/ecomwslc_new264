let mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
    {
    username:{
        type : String,
        required:true,
    },
    useremail:{
        type : String,
        required:true,
    },
    userpassword:{
        type : String,
        required:true,
    },
  

    userStatus:{
        type: String,
        default:1
    }
},
{
    timestamps:true,
})
let userModal = mongoose.model("User" , userSchema);
module.exports = {userModal};