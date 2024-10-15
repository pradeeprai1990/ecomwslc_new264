"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRazorpay } from 'react-razorpay';
import { useSelector } from 'react-redux';
// import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
// import Razorpay from 'react-razorpay/dist/razorpay';
// import  useRazorpay  from 'react-razorpay';


const OrderSummary = () => {

  const { Razorpay } = useRazorpay();
  let [paymenttype,setPaymentType]=useState(1)

  let [shipdata,setShipdata]=useState({
    name:'',
    address:'',
    phoneNumber:''
  })
  let [ShippingCharge,setShippingCharge]=useState(100)

  let [total,setTotal]=useState(0)
  let cartData=useSelector((state)=>state.cartReducer.cart)

  let token=useSelector((state)=>{
    return state.loginReducer.token
  })

  let getValueSetvalue=(event)=>{
    let obj={...shipdata}

    obj[event.target.name]=event.target.value;
    setShipdata(obj)
  }
 
  useEffect(()=>{

    // let total=cartData.reduce((tot,items)=> tot+(items.qty*items.price)  )
    // console.log(total)

    const totalPrice = cartData.reduce((accumulator ,items) => {
      return accumulator += (items.qty*items.price);
    }, 0)
    setTotal(totalPrice)
    console.log(totalPrice)

  },[cartData])

  let saveOrder=(event)=>{
    event.preventDefault()

  
    let finaldata={
      cartData,
      shipdata,
      paymenttype,
      token,
      total
    }

    axios.post("http://localhost:8000/website/order/order-save",finaldata)
    .then((res)=>{
      if(res.data.payment_type==1){
          //Redirect Thank You Page
      }
      if(res.data.payment_type==2){
        const options={
          key: "rzp_test_0gYcjwTJCUgngj",
          amount: res.data.order.amount, // Amount in paise
          currency: "INR",
          name: "WS",
          description: "WS Provide Product",
          order_id: res.data.order.id, // Generate order_id on server
          handler: (response) => {
            console.log(response)
           axios.post("http://localhost:8000/website/order/payment-verification",
                    {razorpay_order_id:res.data.order.id,razorpay_response:response}
                ).then(
                    (success) => {

                      alert("Payment Successful!");
                    }
                ).catch(
                    (error) => {
                        notify("Client error", "error");
                    }
               )
           
            
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
        };
        const razorpayInstance = new Razorpay(options);
       razorpayInstance.open();
       
      }
    })

  }

  return (
  <>
    <div className="container mx-auto my-10 p-6">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg">

     
        <div className="w-full lg:w-1/2 p-6">
          <h3 className="text-2xl font-semibold mb-6">Delivery</h3>

          <form onSubmit={saveOrder}>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Full Name</label>
              <input
                type="text"
                required
                name='name'
                value={shipdata.name}
                onChange={getValueSetvalue}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Address</label>
              <textarea
                required
                name='address'
                value={shipdata.address}
                onChange={getValueSetvalue}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your delivery address"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Phone Number</label>
              <input
                type="tel"
                name='phoneNumber'
                value={shipdata.phoneNumber}
                onChange={getValueSetvalue}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Payment Method */}
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="1"
                  checked={ paymenttype==1 ? true : '' }
                  onChange={(event)=> setPaymentType(event.target.value) }
                
                  className="form-radio"
                />
                <span className="ml-2">Cash on Delivery</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="2"
                  checked={ paymenttype==2 ? true : '' }
                  onChange={(event)=> setPaymentType(event.target.value) }
                
                  className="form-radio"
                />
                <span className="ml-2">Razorpay</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-6">
          <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
          
          {/* Item Summary */}
          <div className="border-b pb-4 mb-4">

            {cartData.length>=1 
              ?
              cartData.map((items,index)=>{
                return(
                  <div className="flex justify-between mb-2">
                    <p>
                      {items.pname}
                    </p>
                    <p> {items.qty} * {items.price}=  {items.qty * items.price } </p>
                   </div>
                )
              })
              :
              ''
            }

            
            
          </div>

          {/* Price Summary */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p>Rs {total}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping</p>
              <p> Rs{ShippingCharge}</p>
            </div>
            
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t border-gray-300">
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>Rs {ShippingCharge+total} </p>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default OrderSummary;
