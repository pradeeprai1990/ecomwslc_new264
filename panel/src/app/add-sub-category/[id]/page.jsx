"use client";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
export default function page() {
  let [redirectStatus, setRedirectStatus] = useState(false);
  let [formObj, setformObj] = useState({
    subcategoryName: "",
    subcategoryDes: "",
    parentcategory: "",
    subcategoryStatus: 1,
  });
  let [preview, setPreview] = useState(
    `https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/No_Preview_image_2.png/900px-No_Preview_image_2.png?20200726064257`
  );

  let params = useParams();
  let paramId = params.id;
  let categorySave = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    axios
      .put(`http://localhost:8000/admin/subcat/update/${paramId}`, formdata)
      .then((res) => {
        console.log(res.data);
      });
    Swal.fire("SubCategory Update successfully!!");
    setformObj({
      subcategoryName: "",
      subcategoryDes: "",
      subcategoryStatus: 1,
    });
    setRedirectStatus(true);
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
  //update category function
  let getValue = (e) => {
    let obj = { ...formObj };
    let inputName = e.target.name;
    let inputValue = e.target.value;
    obj[inputName] = inputValue;
    setformObj(obj);
  };
  useEffect(() => {
    if (paramId != undefined) {
      axios
        .get(`http://localhost:8000/admin/subcat/edit/${paramId}`)
        .then((res) => {
          return res.data;
        })
        .then((finalres) => {
          console.log("finalrespose", finalres.data);

          let obj = {
            subcategoryName: finalres.data.subcategoryName,
            subcategoryDes: finalres.data.subcategoryDes,
            parentcategory: finalres.data.parentcategory,
            subcategoryStatus: 1,
          };
          setformObj(obj);

          setPreview(
            `http://localhost:8000/upload/subcategory/${finalres.data.categoryImage}`
          );
        });
    }
  }, [paramId]);
  useEffect(() => {
    if (redirectStatus) {
      redirect("/view-sub-category");
    }
  }, [redirectStatus]);
  return (
    <form action="" onSubmit={categorySave}>
      <div class="p-4 border border-gray-300 shadow-md rounded-lg w-[90%] mx-auto my-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
            Edit Sub-Category
          </h2>
        </div>

        <h1>Category Name</h1>

        <input
          value={formObj.subcategoryName}
          onChange={getValue}
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
          value={formObj.parentcategory}
          onChange={getValue}
        >
          {categoryData.map((item, index) => {
            console.log(item);
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
            onChange={getValue}
            value={formObj.subcategoryDes}
            type="text"
            name="subcategoryDes"
            placeholder="Category Description"
            className="my-5 border-2 w-[80%] py-2 rounded placeholder:text-black placeholder:pl-[8px]"
          />
        </div>
        <div className="flex space-x-5">
          <h1>Status : </h1>
          <input
            onChange={getValue}
            type="radio"
            name="subcategoryStatus"
            value={1}
            checked={formObj.subcategoryStatus == 1 ? "true" : ""}
          />
          <label htmlFor="active">Active</label>
          <input
            onChange={getValue}
            type="radio"
            name="subcategoryStatus"
            value={0}
            checked={formObj.subcategoryStatus == 0 ? "true" : ""}
          />
          <label htmlFor="deactive">Deactive</label>
        </div>
        <button
          className="bg-purple-800 text-white my-[20px] py-2 px-[20px] rounded"
          type="submit"
        >
          Update Category
        </button>
      </div>
    </form>
  );
}
