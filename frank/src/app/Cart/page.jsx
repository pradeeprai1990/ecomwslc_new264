"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "../../img/cart1.webp";
import img2 from "../../img/cart2.webp";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { changeQty, removeCart } from "../slice/cartSlice";
export default function page() {
  let cartData=useSelector((state)=>state.cartReducer.cart)


  return (
    <>
      <div className="w-full">
        <h1 className="text-[30px] text-center mt-6 mb-6 font-bold">
          Cart
        </h1>
        <div className="w-full grid grid-cols-2 pl-[30px] mb-[30px]">
        <div> 
        {cartData.length>=1
          ?
          cartData.map((items,index)=>{
            return(
             
              <CartRow items={items} key={index}/>
          
            )
          })
          :
          ''
        }
         </div>
         
       <div className="w-[615px] bg-[rgb(227, 228, 234)] border p-[30px]">
                <h1 className="font-bold text-[20px]">Order Summery</h1>
                <div class="relative h-11 w-full min-w-[200px] flex ">
                  <input
                    placeholder="Standard"
                    class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Sub Total
                  </label>
                  <h1 className="font-bold">$1234</h1>
                </div>
    
                <div class="relative h-11 w-full min-w-[200px] flex">
                  <input
                    placeholder="Standard"
                    class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Delivery Charges
                  </label>
                  <h1 className="font-bold">$1234</h1>
                </div>
                <div class="relative h-11 w-full min-w-[200px] flex">
                  <input
                    placeholder="Standard"
                    class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Total
                  </label>
                  <h1 className="font-bold">$1234</h1>
                </div>
                <button className="w-full bg-blue-600 rounded p-2 text-white mt-5">
                   <Link href={'/Checkout'}>Check-Out</Link>
    
                </button>
              </div>
              </div>
      </div>
    </>
  );
}


function CartRow({items}){
  let dispatch=useDispatch()
  
  let [qty,setQty]=useState(items.qty)
  

  useEffect(()=>{
    dispatch(changeQty({pid:items.PId,qty}))
  },[qty])
  return(
    <div className="grid grid-cols-3 mb-4">
    <div>
      <img src={items.image} className="h-[200px] w-[200px]" />
    </div>
    <div className="pl-[20px]">
      <h1> {items.pname} </h1>
      <div className="flex space-x-2 items-center mt-[20px]">
        <FaMinus onClick={()=>{
            if(qty>1){
              setQty(qty-1)
            }
        }}
         className="bg-[#ccc] p-[5px] font-bold cursor-pointer text-[20px]" />
        <input
          type="number"
          min={1}
          max={5}
          value={qty}
          
          className="w-[40px] border pl-[8px]"
        />
        <FaPlus onClick={()=>{
           if(qty<5){
             setQty(qty+1)
          }
        }} 
        className="bg-[#ccc] p-[5px] font-bold cursor-pointer text-[20px]" />
      </div>
      <h3 className="font-bold mt-[15px]"> Rs {items.price}</h3>
      
      <h3>Total Amount Rs {qty *items.price }</h3>
      
      <button  onClick={()=>dispatch(removeCart({pid:items.PId}))} className="bg-red-800 rounded p-[5px] text-white mt-[15px]">
        Remove
      </button>
    </div>
  </div>
 
  )
}