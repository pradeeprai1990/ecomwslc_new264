"use client";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
export default function page() {
  const [redirectStatus, setRedirectStatus] = useState(false);
  let [preview, setPreview] = useState(
    `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/No_Preview_image_2.png/900px-No_Preview_image_2.png?20200726064257`
  );
  let categorySave = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    axios
      .post(`http://localhost:8000/admin/subcat/insert`, formdata)
      .then((res) => {
        console.log(res.data);
      });
    Swal.fire("SubCategory saved successfully!!");
    e.target.reset();
    setRedirectStatus(true)
  };

  //to dynamic parent category selection items
  let [categoryData, setcategoryData] = useState([]);

  let viewcategory = () => {
    axios
      .get(`http://localhost:8000/admin/subcat/parentcategory`)
      .then((res) => {
        return res.data;
      })
      .then((finalres) => {
        console.log(finalres.data)
        if (finalres.status == 1) {

          setcategoryData(finalres.data);
        }
      });
  };
  useEffect(() => {
    viewcategory();
  }, []);
  let previewfunction = (e) => {
    let selectimg = URL.createObjectURL(e.target.files[0]);
    setPreview(selectimg);
  };
  useEffect(()=>{
    // Redirect when redirectStatus is true
    if (redirectStatus) {
      redirect("/view-sub-category");
    }
  },[redirectStatus])
  return (
    <form action="" onSubmit={categorySave}>
      <div class="p-4 border border-gray-300 shadow-md rounded-lg w-[90%] mx-auto my-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
            Add Sub-Category
          </h2>
        </div>

        <h1>Category Name</h1>

        <input
          type="text"
          placeholder="Category Name"
          name="subcategoryName"
          className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
        />

        <h1>ParentCategory Name</h1>
        {/* dropdown from parent category */}
        <select
          name="parentcategory"
          id=""
          className="w-[80%] p-2 mb-3 border-gray-300 border-2 rounded"
        >
          <option value="">Select Parent Category</option>
          {categoryData.map((item, index) => {
            return (
              <option value={item._id} key={index}>
                {item.categoryName}
              </option>
            );
          })}
        </select>
        <h1>Category Image</h1>
        <div className="grid-cols-2 w-full flex gap-10 items-center">
          <input
            onChange={previewfunction}
            type="file"
            placeholder="Category Image"
            name="categoryImage"
            className="my-5 border-2 w-[50%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
          <img src={preview} alt="" className="w-[80px] h-[80px]" />
        </div>

        <div className="flex flex-col">
          <h1>Category Description</h1>
          <input
            type="text"
            name="subcategoryDes"
            placeholder="Category Description"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
        </div>
        <div className="flex space-x-5">
          <h1>Status : </h1>
          <input type="radio" name="subcategoryStatus" value={1} />
          <label htmlFor="active">Active</label>
          <input type="radio" name="subcategoryStatus" value={0} />
          <label htmlFor="deactive">Deactive</label>
        </div>
        <button
          className="bg-purple-800 text-white my-[20px] py-2 px-[20px] rounded"
          type="submit"
        >
          Add Category
        </button>
      </div>
    </form>
  );
}
