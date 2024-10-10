"use client";
import { useScatterChartProps } from "@mui/x-charts/internals";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useState } from "react";
export default function page() {
  const [redirectStatus , setRedirectStatus] = useState(false)
  let param = useParams();
let paramId = param.id;
  let [formObj, setformObj] = useState({
    colorName: "",
    colorCode: "",
    colorStatus: 1,
  });
  let saveColor = (e) => {
    e.preventDefault();
    let colorName = e.target.colorName.value;
    let colorStatus = e.target.colorStatus.value;
    let colorCode = e.target.colorCode.value;
    let colorobj = { colorName, colorStatus, colorCode };
    axios
      .put(`http://localhost:8000/admin/color/update/${paramId}`, colorobj)
      .then((res) => {
        console.log(res.data);
      });
    Swal.fire("Color Update successfully!!");
    setformObj({ colorName: "", colorCode: "", colorStatus: 1 });
    setRedirectStatus(true);
  };
  let getValue = (e) => {
    let obj = { ...formObj };
    let inputName = e.target.name;
    let inputValue = e.target.value;
    obj[inputName] = inputValue;
    setformObj(obj);
  };

useEffect(()=>{
if(paramId!=undefined){
  axios.get(`http://localhost:8000/admin/color/edit/${paramId}`).then((res)=>{
    return res.data
  }).then((finalres)=>{
    console.log(finalres.data)
    let {colorName , colorCode , colorStatus} = finalres.data;
    setformObj({colorName, colorCode, colorStatus})
  })
}
},[paramId])
useEffect(()=>{
if(redirectStatus){
  redirect("/view-color");
}
},[redirectStatus])
  return (
    <form action="" onSubmit={saveColor}>
      <div className="pl-[17px]">
        <h1 className="font-bold text-[25px]">Edit Color</h1>
        <p className="mt-5 ">Colour Name</p>
     
        <input
          onChange={getValue}
          value={formObj.colorName}
          type="text"
          name="colorName"
          placeholder="Colour Name"
          className="mb-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
        />
        <div className="flex flex-col">
          <label htmlFor="color" className="pr-[20px]">
            Colour Picker
          </label>
          <input
            type="color"
            className="my-5"
            name="colorCode"
            value={formObj.colorCode}
            onChange={getValue}
          />
        </div>
        <div className="flex space-x-5">
          <h1>Status : </h1>
          <input
            type="radio"
            name="colorStatus"
            value={1}
            checked={formObj.colorStatus == 1 ? "true" : ""}
            onChange={getValue}
          />
          <label htmlFor="active">Active</label>
          <input
            type="radio"
            name="colorStatus"
            value={0}
            checked={formObj.colorStatus == 0 ? "true" : ""}
            onChange={getValue}
          />
          <label htmlFor="deactive">Deactive</label>
        </div>
        <button
          className="bg-purple-800 text-white my-[20px] py-2 px-[20px] rounded"
          type="submit"
        >
          Update Color
        </button>
      </div>
    </form>
  );
}
