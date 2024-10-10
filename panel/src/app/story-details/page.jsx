"use client";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function page() {
  const [redirectStatus, setRedirectStatus] = useState(false);
  let [preview, setPreview] = useState(
    `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/No_Preview_image_2.png/900px-No_Preview_image_2.png?20200726064257`
  );
  let saveStory = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    axios
      .post(`http://localhost:8000/admin/story/insert`, formdata)
      .then((res) => {
        console.log(res.data);
      });
    Swal.fire("Story saved successfully!!");
    e.target.reset();
    setRedirectStatus(true)
  };
  let previewfunction = (e) => {
    let selectimg = URL.createObjectURL(e.target.files[0]);
    setPreview(selectimg);
  };
  useEffect(()=>{
    if(redirectStatus){
      redirect("/story-view");
    }
      } , [redirectStatus])
  return (
    <>
      <form action="" onSubmit={saveStory}>
        <div class="p-4 border border-gray-300 shadow-md rounded-lg w-[90%] mx-auto my-5">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
             Add Story
            </h2>
          </div>
          <h1>Story Name</h1>
          <input
            type="text"
            name="storyName"
            placeholder="Story Name"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
          <h1>Image</h1>
          <div className="grid-cols-2 w-full flex gap-10 items-center">
            <input
              type="file"
              placeholder="Image"
              name="storyImage"
              className="my-5 border-2 w-[50%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
            />
            <img src={preview} alt="" className="w-[80px] h-[80px]" />
          </div>

          <h1>Banner Image</h1>
          <div className="grid-cols-2 w-full flex gap-10 items-center">
          <input
            type="file"
            placeholder="Image"
            name="bannerImage"
            className="my-5 border-2 w-[50%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
           <img src={preview} alt="" className="w-[80px] h-[80px]" />
          </div >
        

          <div className="flex flex-col">
          <h1>Story Description</h1>

<textarea
  type="text"
  name="storyDes"
  placeholder="Product Description"
  className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-gray placeholder:pl-[8px]"
/>
          </div>
          <div className="flex space-x-5">
            <h1>Status : </h1>
            <input type="radio" name="storyStatus" value={1} />
            <label htmlFor="active">Active</label>
            <input type="radio" name="storyStatus" value={0} />
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
