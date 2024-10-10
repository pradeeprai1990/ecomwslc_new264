const { adminmodal } = require("../modal/adminModal")
var jwt = require('jsonwebtoken');
let admin =async (req,res) =>{
let obj ;
    let username = req.body.email
    let userpassword = req.body.password
    console.log(username,userpassword)
    let adminTabel = await adminmodal.findOne({
        adminName:username,
        adminPassword:userpassword
    })
    console.log(adminTabel)
    if(adminTabel !== null && adminTabel !== '' && adminTabel !==undefined){
        var token = jwt.sign({adminId : adminTabel._id }, process.env.TokenKey);
       obj = {
        status: 1,
        msg: "Login Susseccfully",
        data: adminTabel,
        token
       }
    }else{
       obj = {
        status: 0,
        msg: "invalid username or password",
        data: adminTabel,
     
       }
    }
    res.send(obj)

}
module.exports = {admin}