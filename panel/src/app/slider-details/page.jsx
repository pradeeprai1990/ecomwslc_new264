"use client";
import axios from "axios";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { redirect } from "next/navigation";
export default function page() {
  const [redirectStatus, setRedirectStatus] = useState(false);
  let [preview, setPreview] = useState(
    `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/No_Preview_image_2.png/900px-No_Preview_image_2.png?20200726064257`
  );
  let saveSlider = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    axios
      .post("http://localhost:8000/admin/slider/insert", formdata)
      .then((res) => {
        console.log(res.data);
      });
    Swal.fire("Slider saved successfully!!");
    e.target.reset();
    setRedirectStatus(true)
  };
  let previewfunction = (e) => {
    let selectimg = URL.createObjectURL(e.target.files[0]);
    setPreview(selectimg);
  };
  useEffect(()=>{
if(redirectStatus){
  redirect("/slider-view");
}
  },[redirectStatus])
  return (
    <>
      <form action="" onSubmit={saveSlider}>
        <div class="p-4 border border-gray-300 shadow-md rounded-lg w-[90%] mx-auto my-5">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
             Add Slider
            </h2>
          </div>
          <h1>Slider Name</h1>
          <input
            type="text"
            name="sliderName"
            placeholder="Slider Name"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
          <h1>Heading</h1>
          <input
            type="text"
            placeholder="Heading"
            name="sliderHeading"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
          <h1>Sub Heading</h1>
          <input
            type="text"
            placeholder="Sub Heading"
            name="subHeading"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />

          <h1>Slider Image</h1>
          <div className="grid-cols-2 w-full flex gap-10 items-center">
          <input
            type="file"
            onChange={previewfunction}
            placeholder="Image"
            name="sliderImage"
            className="my-5 border-2 w-[50%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
           <img src={preview} alt="" className="w-[80px] h-[80px]" />
          </div>
       

          <div className="flex space-x-5">
            <h1>Status : </h1>
            <input type="radio" name="sliderStatus" value={1} />
            <label htmlFor="active">Active</label>
            <input type="radio" name="sliderStatus" value={0} />
            <label htmlFor="deactive">Deactive</label>
          </div>
          <button
            className="bg-purple-800 text-white my-[20px] py-2 px-[20px] rounded"
            type="submit"
          >
            Add Slider
          </button>
        </div>
      </form>
    </>
  );
}
