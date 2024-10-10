"use client";
import { ToastContainer, toast } from 'react-toastify';
import { CiHeart } from "react-icons/ci";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeCart } from "../slice/cartSlice";
export default function Product() {
  let [productData, setProductData] = useState([]); // All products data
  let [path, setPath] = useState(""); // Path for images
  let { slug } = useParams(); // Get the dynamic slug for subcategories
  const router = useRouter(); // Next.js router to handle navigation

  // Fetch all product data based on the subcategory (slug)
  const allProducts = (slug) => {
    axios
      .get(`http://localhost:8000/website/product/product-data/${slug}`)
      .then((res) => {
        // Set the product data and image path from response
        setProductData(res.data.productData);
        setPath(res.data.path);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  };

  useEffect(() => {
    if (slug) {
      // Fetch product data when slug is available
      allProducts(slug);
    }
  }, [slug]);

  // Navigate to the product details page using the product ID
  const handleProductClick = (product) => {
    router.push(`/ProductDetails/${product._id}`); // Use product ID for dynamic navigation
  };

  return (
    <div className="w-full mt-[50px] px-[35px]">
      <hr />
      <h1 className="mt-[30px] mb-[10px] text-[20px] capitalize">{slug}</h1>
      <div className="flex space-x-5 flex-wrap my-[30px]">
        {/* Loop through the product data */}
        {productData.map((items, index) => (
            <ProductItems items={items} path={path}  key={index}/>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

function ProductItems({items,path}){

  let cartData=useSelector((state)=>state.cartReducer.cart)


  let dispatch=useDispatch()
  let addtCart=()=>{
      let obj={
        price:items.productPrice,
        qty:1,
        pname:items.productName,
        PId:items._id,
        image:path+items.productImage

      }
      dispatch(addTocart(obj))
      toast.success("Your Item add in Cart")
  } 


  let checkItems= cartData.filter((reduxItems)=> reduxItems.PId==items._id)

  console.log( "My",cartData)
  return(
    <div
           
           
            className="relative shadow-2xl py-5 px-5 cursor-pointer"
          >
            <img
              src={path + items.productImage} // Image with dynamic path
              alt={items.productName}
              className="object-cover img1 mx-auto"
              height={200}
              width={200}
            />
            <div className="absolute top-[0%] ml-[70%] bg-black">
              <p className="text-white text-[10px] p-[5px]">NEW</p>
            </div>
            <div className="flex space-x-7 relative mt-5">
              <h1 className="text-[13px] font-bold">{items.productName}</h1>
              <CiHeart className="text-[25px] absolute top-0 right-0" />
            </div>
            <h1 className="text-[13px] font-bold text-break">
              {items.productShortDes}
            </h1>
            <span className="line-through text-[13px] mr-2">
              ${items.productPrice}
            </span>
            <span className="text-red-600 text-[13px]">
              ${items.productMrp}
            </span>
            <br />
            <span className="text-gray-600 mt-[15px] text-[13px]">
              {items.productColor.length} Colors
            </span>
            <br />
            <span className="text-gray-600 mt-[15px] text-[13px]">
              {items.productSize.length} Sizes
            </span>
            <div>
              {checkItems.length==1 
                  ?
                  <button onClick={()=>dispatch(removeCart({pid:items._id}))}  className="w-full bg-red-900 py-2 mt-3 text-white">
                  Remove Cart
                 </button>
                :
                <button onClick={addtCart}  className="w-full bg-black py-2 mt-3 text-white">
               ADD TO CART
              </button>
              
              }
              
            </div>
          </div>
  )
}