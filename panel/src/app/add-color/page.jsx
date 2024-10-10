"use client";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";

import {
  setIsInitial,
  useTabs,
} from "@material-tailwind/react/components/Tabs/TabsContext";
import { redirect } from "next/navigation";
export default function page() {
  const [redirectStatus, setRedirectStatus] = useState(false);
  let saveColor = (e) => {
    e.preventDefault();
    let colorName = e.target.colorName.value;
    let colorStatus = e.target.colorStatus.value;
    let colorCode = e.target.colorCode.value;
    let colorobj = { colorName, colorStatus, colorCode };
    axios
      .post(`http://localhost:8000/admin/color/insert`, colorobj)
      .then((res) => {
        console.log(res.data);
      });
      Swal.fire("Color saved successfully!!");
      e.target.reset();
      setRedirectStatus(true);
  };
  useEffect(() => {
    if (redirectStatus) {
   redirect("/view-color");
     
    }
  }, [redirectStatus]);
  return (
    <form action="" onSubmit={saveColor}>
      <div className="pl-[17px]">
        <h1 className="font-bold text-[25px]">Add Color</h1>
        <p className="mt-5 ">Colour Name</p>
        <hr />
        <input
          type="text"
          name="colorName"
          placeholder="Colour Name"
          className="mb-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
        />
        <div className="flex flex-col">
          <label htmlFor="color" className="pr-[20px]">
            Colour Picker
          </label>
          <input type="color" className="my-5" name="colorCode" />
        </div>
        <div className="flex space-x-5">
          <h1>Status : </h1>
          <input type="radio" name="colorStatus" value={1} />
          <label htmlFor="active">Active</label>
          <input type="radio" name="colorStatus" value={0} />
          <label htmlFor="deactive">Deactive</label>
        </div>
        <button
          className="bg-purple-800 text-white my-[20px] py-2 px-[20px] rounded"
          type="submit"
        >
          Save Color
        </button>
      </div>
    </form>
  );
}
