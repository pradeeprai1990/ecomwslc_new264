"use client";
import Swal from "sweetalert2";
import axios from "axios";
import { redirect, useRouter } from "next/navigation"; // Import from 'next/navigation'
import React, { useEffect, useState } from "react";

export default function Page() {
  let [preview , setPreview] = useState(`https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/No_Preview_image_2.png/900px-No_Preview_image_2.png?20200726064257`)
  const [redirectStatus, setRedirectStatus] = useState(false);
 
//add category function
  const categorySave = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    axios
      .post(`http://localhost:8000/admin/category/insert`, formData)
      .then((res) => {
        console.log(res.data);
      });
      Swal.fire("Parent Category Saved Successfully!");
      e.target.reset();
      setRedirectStatus(true);
  };


let previewfunction = (e) =>{
  let selectimg = URL.createObjectURL(e.target.files[0])
  setPreview(selectimg);
}
useEffect(()=>{
  // Redirect when redirectStatus is true
  if (redirectStatus) {
    redirect("/view-parent-category");
  
  }
},[redirectStatus])
  return (
    <>
      <form action="" onSubmit={categorySave}>
        <div className="p-4 border border-gray-300 shadow-md rounded-lg w-[90%] mx-auto my-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
              Add Category
            </h2>
          </div>
          <h1>Category Name</h1>
          <input
            type="text"
            placeholder="Category Name"
            name="categoryName"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
          <h1>Category Image</h1>
          <div className="grid-cols-2 w-full flex gap-10 items-center">
            <input
            onChange={previewfunction}
              type="file"
              name="categoryImage"
              placeholder="Category Image"
              className="my-5 border-2 w-[50%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
            />
           <img src={preview} alt="" className="w-[80px] h-[80px]"/>
          </div>
          <div className="flex flex-col">
            <h1>Category Description</h1>
            <input
              type="text"
              name="categoryDes"
              placeholder="Category Description"
              className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
            />
          </div>
          <div className="flex space-x-5">
            <h1>Status :</h1>
            <input type="radio" name="categoryStatus" value={1} />
            <label htmlFor="active">Active</label>
            <input type="radio" name="categoryStatus" value={0} />
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
    </>
  );
}
