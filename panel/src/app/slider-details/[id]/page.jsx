"use client";
import axios from "axios";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { redirect, useParams } from "next/navigation";
export default function page() {
  const [redirectStatus, setRedirectStatus] = useState(false);
  let param = useParams();
  let paramId = param.id;
  let [formObj, setformObj] = useState({
    sliderName: "",
    sliderStatus: 1,
    sliderHeading: "",
    subHeading: "",
  });
  let [preview, setPreview] = useState(
    `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/No_Preview_image_2.png/900px-No_Preview_image_2.png?20200726064257`
  );
  let saveSlider = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    axios
      .put(`http://localhost:8000/admin/slider/update/${paramId}`, formdata)
      .then((res) => {
        console.log(res.data);
      });
    Swal.fire("Slider Update successfully!!");
    setformObj({sliderName : "", sliderStatus: 1, sliderHeading: "", subHeading: "" });
    setRedirectStatus(true)
  };
  let previewfunction = (e) => {
    let selectimg = URL.createObjectURL(e.target.files[0]);
    setPreview(selectimg);
  };
  let getValue = (e) => {
    let obj = { ...formObj };
    let inputValue = e.target.value;
    let inputName = e.target.name;
    obj[inputName] = inputValue;
    setformObj(obj);
  };

  useEffect(()=>{
if(paramId!=undefined){
  axios.get(`http://localhost:8000/admin/slider/edit/${paramId}`).then((res)=>{
    return res.data;
  }).then((finalres) =>{
    console.log(finalres.data)
    let obj = {
      sliderName: finalres.data.sliderName,
      sliderStatus: finalres.data.sliderStatus,
      sliderHeading: finalres.data.sliderHeading,
      subHeading: finalres.data.subHeading,
      sliderImage: finalres.data.sliderImage,
    }
    setformObj(obj);
    setPreview(`http://localhost:8000/upload/slider/${finalres.data.sliderImage}`)
  })
}
  },[paramId])
  useEffect(()=>{
if(redirectStatus){
  redirect("/slider-view");
}
  } , [redirectStatus])
  return (
    <>
      <form action="" onSubmit={saveSlider}>
        <div class="p-4 border border-gray-300 shadow-md rounded-lg w-[90%] mx-auto my-5">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
              Edit Slider
            </h2>
          </div>
          <h1>Slider Name</h1>
          <input
            onChange={getValue}
            value={formObj.sliderName}
            type="text"
            name="sliderName"
            placeholder="Slider Name"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
          <h1>Heading</h1>
          <input
            onChange={getValue}
            value={formObj.sliderHeading}
            type="text"
            placeholder="Heading"
            name="sliderHeading"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
          <h1>Sub Heading</h1>
          <input
            onChange={getValue}
            value={formObj.subHeading}
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
            <input
              type="radio"
              name="sliderStatus"
              onChange={getValue}
              value={1}
              checked={formObj.sliderStatus == 1 ? "true" : ""}
            />
            <label htmlFor="active">Active</label>
            <input
              type="radio"
              name="sliderStatus"
              value={0}
              onChange={getValue}
              checked={formObj.sliderStatus == 0 ? "true" : ""}
            />
            <label htmlFor="deactive">Deactive</label>
          </div>
          <button
            className="bg-purple-800 text-white my-[20px] py-2 px-[20px] rounded"
            type="submit"
          >
            Update Slider
          </button>
        </div>
      </form>
    </>
  );
}
