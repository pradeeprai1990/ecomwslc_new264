const { models } = require("mongoose")
const jwt = require("jsonwebtoken");
const Order = require("../../modal/orderModel");
let saveOrder=async (req,res)=>{

    let {cartData,paymenttype,shipdata,token,total}=req.body;
    const decoded =await jwt.verify(token, process.env.loginKey);
    let userId=decoded.userId
    let saveObj={
        user_id:userId,
        product_details:cartData,
        order_total:total,
        payment_type:paymenttype,
        shipping_details:shipdata
    }

    if(paymenttype==1){
        saveObj['order_status']=1;
        let saveOrder= new Order(saveObj)
        let finalOrder=await saveOrder.save()
        let obj={
            status:1,
            msg:"order Created",
            finalOrder
        }
        res.send(obj)
    }
    else{

    }




}

module.exports={saveOrder}