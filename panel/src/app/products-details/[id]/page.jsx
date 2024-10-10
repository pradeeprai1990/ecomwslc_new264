"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { redirect, useParams } from "next/navigation";

export default function Page() {
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [subcat, setSubCat] = useState([]);
  const [thumbnailPre, setThumbnailPrel] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [redirectStatus, setRedirectStatus] = useState(false);
  const params = useParams();
  const paramId = params.id;

  const [formObj, setformObj] = useState({
    productName: "",
    productDes: "",
    productShortDes: "",
    parentCategory: "",
    subCategory: "",
    color: [],
    size: [],
    productPrice: 0,
    productMrp: 0,
    productStatus: 1,
  });

  // Handle thumbnail preview
  const handleThumbnailChange = (e) => {
    setThumbnailPrel(URL.createObjectURL(e.target.files[0]));
  };

  // Handle gallery preview
  const handleGalleryPreview = (e) => {
    setGalleryPreview(Array.from(e.target.files).map(file => URL.createObjectURL(file)));
  };

  // Fetch categories
  const getCategory = () => {
    axios
      .get(`http://localhost:8000/admin/product/category`)
      .then((res) => setCategory(res.data.data))
      .catch((err) => console.error(err));
  };

  // Fetch colors
  const getColor = () => {
    axios
      .get(`http://localhost:8000/admin/product/color`)
      .then((res) => setColor(res.data.data))
      .catch((err) => console.error(err));
  };

  // Fetch sizes
  const getSize = () => {
    axios
      .get(`http://localhost:8000/admin/product/size`)
      .then((res) => setSize(res.data.data))
      .catch((err) => console.error(err));
  };

  // Fetch subcategories based on parent category
  const getSubCategory = (pid) => {
    if (pid) {
      axios
        .get(`http://localhost:8000/admin/product/subcategory/${pid}`)
        .then((res) => setSubCat(res.data.data))
        .catch((err) => console.error(err));
    }
  };

  // Initial data fetch
  useEffect(() => {
    getCategory();
    getColor();
    getSize();
  }, []);

  // Add product function
  const handleAddProduct = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    
    axios
      .post(`http://localhost:8000/admin/product/update`, data)
      .then(() => {
        Swal.fire("Product Updated Successfully!");
        e.target.reset();
        setThumbnailPrel(null);
        setGalleryPreview([]);
        setRedirectStatus(true);
      })
      .catch((error) => console.error(error));
  };

  // Redirect when redirectStatus is true
  useEffect(() => {
    if (redirectStatus) {
      redirect("/products-items");
    }
  }, [redirectStatus]);

  // Handle input changes
  const getValue = (e) => {
    const { name, value } = e.target;
    setformObj((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // If parent category changes, fetch subcategories
    if (name === "parentCategory") {
      getSubCategory(value);
    }
  };

  // Fetch product details for editing
  useEffect(() => {
    if (paramId) {
      axios
        .get(`http://localhost:8000/admin/product/edit/${paramId}`)
        .then((res) => {
          const finalres = res.data.data;
          setformObj({
            productName: finalres.productName,
            productDes: finalres.productDes,
            productShortDes: finalres.productShortDes,
            parentCategory: finalres.parentCategory,
            subCategory: finalres.subCategory,
            color: finalres.color,
            size: finalres.size,
            productPrice: finalres.productPrice,
            productMrp: finalres.productMrp,
            productStatus: finalres.productStatus,
          });
          setThumbnailPrel(`http://localhost:8000/upload/product/${finalres.productImage}`);
          setGalleryPreview(finalres.productGallery.map((image) => `http://localhost:8000/upload/product/${image}`));
          getSubCategory(finalres.parentCategory); // Fetch subcategories after setting parentCategory
        })
        .catch((err) => console.error(err));
    }
  }, [paramId]);

  return (
    <div className="p-4 border border-gray-300 shadow-md rounded-lg w-[90%] mx-auto my-5">
      <h2 className="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
        Edit Product Details
      </h2>
      <form onSubmit={handleAddProduct}>
        <h1>Product Name</h1>
        <input
          type="text"
          onChange={getValue}
          name="productName"
          value={formObj.productName}
          placeholder="Product Name"
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        <h1>Product Description</h1>
        <textarea
          onChange={getValue}
          name="productDes"
          value={formObj.productDes}
          placeholder="Product Description"
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        <h1>Product Short Description</h1>
        <textarea
          onChange={getValue}
          name="productShortDes"
          value={formObj.productShortDes}
          placeholder="Product Short Description"
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        <h1>Select Parent Category</h1>
        <select
          name="parentCategory"
          value={formObj.parentCategory}
          onChange={getValue}
          className="w-[80%] p-2 mb-3 border-gray-300 border-2 rounded"
        >
          {category.map((item) => (
            <option value={item._id} key={item._id}>
              {item.categoryName}
            </option>
          ))}
        </select>
        <h1>Select Sub-Category</h1>
        <select
          name="subCategory"
          value={formObj.subCategory}
          onChange={getValue}
          className="w-[80%] p-2 mb-3 border-gray-300 border-2 rounded"
        >
          {subcat.map((item) => (
            <option value={item._id} key={item._id}>
              {item.subcategoryName}
            </option>
          ))}
        </select>
        <h1>Thumbnail Image</h1>
        <input
          type="file"
          name="productImage"
          onChange={handleThumbnailChange}
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        {thumbnailPre && <img src={thumbnailPre} className="w-[50px]" alt="Thumbnail Preview" />}
        <h1>Gallery Image</h1>
        <input
          type="file"
          name="productGallery"
          onChange={handleGalleryPreview}
          multiple
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
        />
        <div className="flex gap-2">
          {galleryPreview.map((imgPre, index) => (
            <img key={index} src={imgPre} className="w-[50px]" alt="Gallery Preview" />
          ))}
        </div>
        <div className="flex flex-col">
          <h1>Price</h1>
          <input
            type="number"
            name="productPrice"
            value={formObj.productPrice}
            onChange={getValue}
            placeholder="Price"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
          />
          <h1>MRP</h1>
          <input
            type="number"
            name="productMrp"
            value={formObj.productMrp}
            onChange={getValue}
            placeholder="MRP"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
          />
          <div className="flex space-x-2">
            <h1>Select Size</h1>
            <select
              name="size[]"
              value={formObj.size}
              onChange={getValue}
              multiple
              className="w-[30%] p-2 mb-3 border-gray-300 border-2 rounded"
            >
              {size.map((item) => (
                <option value={item.sizeName} key={item._id}>
                  {item.sizeName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <h1>Select Color</h1>
            <select
              name="color[]"
              value={formObj.color}
              onChange={getValue}
              multiple
              className="w-[30%] p-2 mb-3 border-gray-300 border-2 rounded"
            >
              {color.map((item) => (
                <option value={item.colorName} key={item._id}>
                  {item.colorName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="my-5 border-2 bg-blue-600 text-white w-[15%] p-2 rounded">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
