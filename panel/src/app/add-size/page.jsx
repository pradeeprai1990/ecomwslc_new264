"use client"
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
export default function page() {
  const [redirectStatus, setRedirectStatus] = useState(false);
  let saveSize = (e) =>{
    e.preventDefault();
    let sizeName = e.target.sizeName.value;
    let sizeStatus = e.target.sizeStatus.value;
    let sizeobj = {sizeName , sizeStatus}
    axios.post(`http://localhost:8000/admin/size/insert` , sizeobj)
    .then((res) =>{
      console.log(res.data)
    })
    Swal.fire("Size saved successfully!!");
    e.target.reset();
    setRedirectStatus(true)
  }
  useEffect(()=>{
    // Redirect when redirectStatus is true
    if (redirectStatus) {
      redirect("/view-size");
    }
  },[redirectStatus])
  return (
    <>
      <form action="" onSubmit={saveSize}>
        <div className="w-[90%] mx-auto rounded border p-5 my-5">
          {" "}
          <h1 className="font-bold text-[30px] w-full bg-gray-100 rounded">
            Add Size
          </h1>
          <p className="my-5">Size Name</p>
          <hr />
          <input
            type="text"
            placeholder="XL:"
            name="sizeName"
            className="my-5 border-2 w-full py-2 rounded placeholder:text-black pl-2"
          />
          <div className="flex space-x-5">
            <h1>Status :</h1>
            <input type="radio" name="sizeStatus" value={1} />
            <label htmlFor="active">Active</label>
            <input type="radio" name="sizeStatus" value={0} />
            <label htmlFor="deactive">Deactive</label>
          </div>
          <button className="bg-purple-800 text-white rounded px-5 py-2 my-5" type="submit">
            Add Size
          </button>
        </div>
      </form>
    </>
  );
}
