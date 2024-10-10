"use client";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function page() {
  const [redirectStatus, setRedirectStatus] = useState(false);
  let param = useParams()
  let paramId = param.id;
  let [formObj, setformObj] = useState({
    sizeName: "",
    sizeStatus: 1,
  });
  let saveSize = (e) => {
    e.preventDefault();
    let sizeName = e.target.sizeName.value;
    let sizeStatus = e.target.sizeStatus.value;
    let sizeobj = { sizeName, sizeStatus };
    axios
      .put(`http://localhost:8000/admin/size/update/${paramId}`, sizeobj)
      .then((res) => {
        console.log(res.data);
      });
    Swal.fire("Size update successfully!!");
    setformObj({ sizeName: "", sizeStatus: 1 });
    setRedirectStatus(true)
  };
  //state to hold form data
  let getValue = (e) => {
    let obj = { ...formObj };
    let inputValue = e.target.value;
    let inputName = e.target.name;
    obj[inputName] = inputValue;
    setformObj(obj);
  };

  //get data for edit
  useEffect(()=>{
if(paramId!=undefined){
  axios.get(`http://localhost:8000/admin/size/edit/${paramId}`).then((res)=>{
    return res.data;

  }).then((finalres) =>{
    let {sizeName , sizeStatus} = finalres.data;
    setformObj({sizeName , sizeStatus})
  })
}
  },[paramId])
  useEffect(()=>{
    if(redirectStatus){
      redirect("/view-size");
    }
  },[redirectStatus])
  return (
    <>
      <form action="" onSubmit={saveSize}>
        <div className="w-[90%] mx-auto rounded border p-5 my-5">
          {" "}
          <h1 className="font-bold text-[30px] w-full bg-gray-100 rounded">
            Edit Size
          </h1>
          <p className="mt-5">Size Name</p>
          <input
            onChange={getValue}
            value={formObj.sizeName}
            type="text"
            placeholder="XL:"
            name="sizeName"
            className="mb-5 border-2 w-full py-2 rounded placeholder:text-black pl-2"
          />
          <div className="flex space-x-5">
            <h1>Status :</h1>
            <input
              type="radio"
              name="sizeStatus"
              value={1}
              checked={formObj.sizeStatus == 1 ? "true" : ""}
              onChange={getValue}
            />
            <label htmlFor="active">Active</label>
            <input
              type="radio"
              name="sizeStatus"
              value={0}
              checked={formObj.sizeStatus == 0 ? "true" : ""}
              onChange={getValue}
            />
            <label htmlFor="deactive">Deactive</label>
          </div>
          <button
            className="bg-purple-800 text-white rounded px-5 py-2 my-5"
            type="submit"
          >
            Update Size
          </button>
        </div>
      </form>
    </>
  );
}
