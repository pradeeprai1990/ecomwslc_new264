const { models } = require("mongoose")
const jwt = require("jsonwebtoken");
const Order = require("../../modal/orderModel");
const Razorpay = require('razorpay');
const crypto = require('crypto');


var instance = new Razorpay({
    key_id: 'rzp_test_0gYcjwTJCUgngj',
    key_secret: 'Gvf64yOyMhHiF04opoOO3A95',
  });



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
        saveObj['payment_type']=2;
        saveObj['payment_status']=1;
        let saveOrder= new Order(saveObj)
        let finalOrder=await saveOrder.save()   //order Save in Order table  //45000

       
        let options = {
            amount: total*100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: finalOrder._id
          };

          instance.orders.create(options,async (error,order)=>{

            let orderModelUpdate=await Order.updateOne({_id:finalOrder._id},{$set:{razorpay_order_id:order.id}})

            let obj={
                status:1,
                msg:"order Created",
                payment_type:2,
                order
            }
            res.send(obj)
          })
    }




}


let paymentVerification=(req, res) => {



    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.razorpay_response;




    const generated_signature = crypto.createHmac('sha256', 'Gvf64yOyMhHiF04opoOO3A95')
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    // Verify the signature
    if (generated_signature === razorpay_signature) {
        // Signature is valid
        // let obj={

        // }
        // let updateOrder=new Order.updateOne()    
        console.log('Payment verified successfully.');
        res.status(200).send('Payment verified successfully.');
    } else {
        // Signature is invalid
        console.log('Payment verification failed.');
        res.status(400).send('Payment verification failed.');
    }

}
module.exports={saveOrder,paymentVerification}