"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
export default function page() {
  let [category, setCategory] = useState([]);
  let [color, setColor] = useState([]);
  let [size, setSize] = useState([]);
  let [subcat, setSubCat] = useState([]);
  const [thumbnailPre, setThumbnailPrel] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [redirectStatus, setRedirectStatus] = useState(false);
  // handel preview Start
  const handleThumbnailChange = (e) => {
    setThumbnailPrel(URL.createObjectURL(e.target.files[0]));
  };

  const handleGalleryPreview = (e) => {
    setGalleryPreview(Array.from(e.target.files));
  };
  // handel preview end
  //parent category function
  let getCategory = () => {
    axios
      .get(`http://localhost:8000/admin/product/category`)
      .then((res) => {
        return res.data;
      })
      .then((finalres) => {
        setCategory(finalres.data);
        console.log(finalres.data);
      });
  };
  //color function
  let getColor = () => {
    axios
      .get(`http://localhost:8000/admin/product/color`)
      .then((res) => {
        return res.data;
      })
      .then((finalres) => {
        setColor(finalres.data);
        console.log(finalres.data);
      });
  };
  //size function
  let getSize = () => {
    axios
      .get(`http://localhost:8000/admin/product/size`)
      .then((res) => {
        return res.data;
      })
      .then((finalres) => {
        setSize(finalres.data);
        console.log(finalres.data);
      });
  };

  //get sub category function
  let getSubCategory = (pid) => {
    axios
      .get(`http://localhost:8000/admin/product/subcategory/${pid}`)
      .then((res) => {
        return res.data;
      })
      .then((finalres) => {
        console.log(finalres.data);
        setSubCat(finalres.data);
      });
  };
  useEffect(() => {
    getCategory();
    getColor();
    getSize();
  }, []);
  //add product function

  const handleAddProduct = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);

    axios
      .post(`http://localhost:8000/admin/product/insert-product`, data)
      .then((response) => {
        console.log(response);
        Swal.fire("Product Addedd Successfully!");
        e.target.reset(); // This resets the text input fields
        setThumbnailPrel(null); // Reset thumbnail preview
        setGalleryPreview([]); // Reset gallery preview
        setRedirectStatus(true);
      })

      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(()=>{
    // Redirect when redirectStatus is true
    if (redirectStatus) {
      redirect("/products-items");
    
    }
  },[redirectStatus])
  return (
    <div class="p-4 border border-gray-300 shadow-md rounded-lg w-[90%] mx-auto my-5">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
          Product Details
        </h2>
      </div>

      <form action="" onSubmit={handleAddProduct}>
        <h1>Product Name</h1>
        <input
          type="text"
          placeholder="Product Name"
          name="productName"
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        <h1>Product Description</h1>

        <textarea
          type="text"
          name="productDes"
          placeholder="Product Description"
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        <h1>Product Short Description</h1>
        <textarea
          type="text"
          name="productShortDes"
          placeholder="Product Short Description"
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        <h1> Select ParentCategory</h1>
        <select
          name="parentCategory"
          onChange={(e) => getSubCategory(e.target.value)}
          id=""
          className="w-[80%] p-2 mb-3 border-gray-300 border-2 rounded"
        >
          <option value="shirt" className="w-full">
            --Select--
          </option>

          {category.map((item, index) => {
            return (
              <option value={item._id} key={index}>
                {item.categoryName}
              </option>
            );
          })}
        </select>
        <h1> Select Sub-Category</h1>
        <select
          name="subCategory"
          id=""
          className="w-[80%] p-2 mb-3 border-gray-300 border-2 rounded"
        >
          <option value="shirt" className="w-full">
            --Select--
          </option>
          {subcat.map((item, index) => {
            return (
              <option value={item._id} key={index}>
                {item.subcategoryName}
              </option>
            );
          })}
        </select>

        <h1>Thumbnail Image</h1>
        <input
          type="file"
          name="productImage"
          onChange={handleThumbnailChange}
          placeholder="Products Image"
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        <div>
          {thumbnailPre && <img src={thumbnailPre} className="w-[50px]" />}
        </div>
        <h1>Gallery Image</h1>
        <input
          type="file"
          name="productGallery"
          onChange={handleGalleryPreview}
          multiple
          placeholder="Gallery Image"
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        <div className="flex gap-2">
          {galleryPreview &&
            galleryPreview.map((imgPre) => (
              <img src={URL.createObjectURL(imgPre)} className="w-[50px]" />
            ))}
        </div>
        <div className="flex flex-col">
          <h1>Price</h1>
          <input
            type="number"
            name="productPrice"
            placeholder="Price"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
          />
          <h1>MRP</h1>
          <input
            type="number"
            name="productMrp"
            placeholder="Mrp"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
          />
          <div className="flex space-x-2">
            <h1> Select Size</h1>
            <select
              name="size[]"
              id=""
              multiple
              className="w-[30%] p-2 mb-3 border-gray-300 border-2 rounded"
            >
              <option value="shirt" className="w-full">
                --Select--
              </option>
              {size.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.sizeName}
                  </option>
                );
              })}
            </select>
            <h1> Select Color</h1>
            <select
              multiple
              name="color[]"
              id=""
              className="w-[30%] p-2 mb-3 border-gray-300 border-2 rounded"
            >
              <option value="shirt" className="w-full">
                --Select--
              </option>
              {color.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.colorName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex space-x-5">
          <h1>Status : </h1>
          <input type="radio" name="active" />
          <label htmlFor="active">Active</label>
          <input type="radio" name="deactive" />
          <label htmlFor="deactive">Deactive</label>
        </div>
        <button className="bg-purple-800 text-white my-[20px] py-2 px-[20px] rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
