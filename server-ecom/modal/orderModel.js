const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the main order schema
const orderSchema = new Schema({
    user_id: { 
       
            type: mongoose.Types.ObjectId,
            ref: "User",
         
    },
    product_details: { type: Array,required: true },
    order_total: { type: Number, required: true },
    razorpay_order_id: { type: String, default: null },
    razorpay_payment_id: { type: String, default: null },
    payment_type:{
        type: Number,
        enum: [1,2],
        //1 Cash 2 Payment
    },
    payment_status:{
        type: Number,
        enum: [0,1,2],  //1 Pendding
        default: 0
    },
    order_status: {
        type: Number,
        enum: [0,1, 2, 3],
        default: 1
    },  //1  //2  //3 

    shipping_details: { type: Object, required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
