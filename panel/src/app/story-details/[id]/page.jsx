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
    storyName: "",
    storyStatus: 1,
    storyDes: "",
  });
  let [preview, setPreview] = useState(
    `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/No_Preview_image_2.png/900px-No_Preview_image_2.png?20200726064257`
  );
  let [banerpreview , setBanerPreview] = useState(`https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/No_Preview_image_2.png/900px-No_Preview_image_2.png?20200726064257`)
  let saveStory = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    axios
      .put(`http://localhost:8000/admin/story/update/${paramId}`, formdata)
      .then((res) => {
        console.log(res.data);
      });
    Swal.fire("Story Update successfully!!");
    setformObj({ storyName: "", storyStatus: 1, storyDes: "" });
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


  useEffect(() => {
    if(paramId!=undefined){
      axios.get(`http://localhost:8000/admin/story/edit/${paramId}`).then((res)=>{
        return res.data;
      }).then((finalres)=>{
        console.log(finalres.data)
        let obj = {
          storyName:finalres.data.storyName,
          storyStatus:finalres.data.storyStatus,
          storyDes:finalres.data.storyDes,
        }
        setformObj(obj)
        setPreview(`http://localhost:8000/upload/story/${finalres.data.storyImage}`)
        setBanerPreview(`http://localhost:8000/upload/story/${finalres.data.bannerImage}`)

      })
    }
  }, [paramId]);
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
              Edit Story
            </h2>
          </div>
          <h1>Story Name</h1>
          <input
            value={formObj.storyName}
            onChange={getValue}
            type="text"
            name="storyName"
            placeholder="Story Name"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
          <h1>Image</h1>
          <div className="grid-cols-2 w-full flex gap-10 items-center">
            <input
              onChange={getValue}
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
              onChange={getValue}
              type="file"
              placeholder="Image"
              name="bannerImage"
              className="my-5 border-2 w-[50%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
            />
            <img src={banerpreview} alt="" className="w-[80px] h-[80px]" />
          </div>

          <div className="flex flex-col">
            <h1>Description</h1>
            <input
              onChange={getValue}
              value={formObj.storyDes}
              type="text"
              name="storyDes"
              placeholder="Description"
              className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
            />
          </div>
          <div className="flex space-x-5">
            <h1>Status : </h1>
            <input
              type="radio"
              name="storyStatus"
              value={1}
              checked={formObj.storyStatus == 1 ? "true" : ""}
              onChange={getValue}
            />
            <label htmlFor="active">Active</label>
            <input
              type="radio"
              name="storyStatus"
              value={0}
              checked={formObj.storyStatus == 0 ? "true" : ""}
              onChange={getValue}
            />
            <label htmlFor="deactive">Deactive</label>
          </div>
          <button
            className="bg-purple-800 text-white my-[20px] py-2 px-[20px] rounded"
            type="submit"
          >
            Update Story
          </button>
        </div>
      </form>
    </>
  );
}
