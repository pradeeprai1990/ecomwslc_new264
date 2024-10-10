"use client";
import React, { useEffect, useState } from "react";
import img1 from "../../img/1.jpg";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
export default function page() {
  const [totalPages, setTotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let token = useSelector((store) => {
    return store.loginReducer.token;
  });
  let [allId, setallId] = useState([]);
  let [cat, setcat] = useState([]);
  let [path, setPath] = useState("");
  let [search, setSearch] = useState(null);
  let subcategory = () => {
    axios
      .get(`http://localhost:8000/admin/subcat/view`, {
        params: search,
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((finalres) => {
        setcat(finalres.data);
        setPath(finalres.path);
        setTotalpages(finalres.totalPage);
      });
  };

  let deletedata = (id) => {
    axios
      .delete(`http://localhost:8000/admin/subcat/delete/${id}`)
      .then((res) => {
        subcategory();
      });
    Swal.fire({
      title: "Are you sure?",
      text: "You want  to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  //delete multiple data logical function
  let delAllIds = (e) => {
    let currentId = e.target.value;
    console.log(e.target);
    if (e.target.checked) {
      if (!allId.includes(currentId)) {
        setallId([...allId, currentId]);
      }
    } else {
      let finalId = allId.filter((v) => v != currentId);

      setallId(finalId);
    }
  };

  //function end

  //delete multi data api function
  let multidel = () => {
    if (allId.length >= 1) {
      axios
        .post(`http://localhost:8000/admin/subcat/deletemulti`, { ids: allId })
        .then((res) => {
          console.log(res.data);
          subcategory();
        });
      Swal.fire({
        title: "Deleted!",
        text: "Your All file has been deleted.",
        icon: "success",
      });
    } else {
      // alert("Please select al least one item to delete");
      window.alert("Please select al least one item to delete");
    }
  };
  //search form function
  let searchform = (e) => {
    e.preventDefault();
    let subcategoryName = e.target.subcategoryName.value;

    let obj = { subcategoryName };
    console.log(obj);

    setSearch(obj);
  };
  useEffect(() => {
    subcategory();
  }, [search]);
  useEffect(() => {
    let searchData = { ...search };
    searchData["pageNumber"] = currentPage;
    setSearch(searchData);
    subcategory();
  }, [currentPage]);
  return (
    <div class="p-4 border border-gray-300 shadow-md rounded-lg w-[95%] mx-auto my-5">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
          View Category
        </h2>
      </div>
      {/* //search form start */}
      <div className="w-full flex ">
        <form action="" className="border w-full" onSubmit={searchform}>
          <input
            type="text"
            name="subcategoryName"
            id="search"
            placeholder="Search by Name"
            className="py-2 px-3 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 py-1 px-3 text-white ml-10 w-[100px] h-[40px]"
          >
            Search
          </button>
        </form>
      </div>
      {/* search form end */}
      <form action="">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th>
                <button
                  className="bg-red-600 py-1 px-3 text-white rounded cursor-pointer"
                  type="button"
                  onClick={multidel}
                >
                  Delete
                </button>
              </th>
              <th class="border border-gray-300 p-2">Sr.No</th>
              <th class="border border-gray-300 p-2">Category Name</th>
              <th class="border border-gray-300 p-2"> Parent Category Name</th>
              <th class="border border-gray-300 p-2">Image</th>
              <th class="border border-gray-300 p-2">Description</th>
              <th class="border border-gray-300 p-2">Actions</th>
              <th class="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {cat.length >= 1 ? (
              cat.map((item, index) => {
                console.log(item);
                return (
                  <tr>
                    <td class="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onClick={delAllIds}
                        value={item._id}
                      />
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      {(currentPage - 1) * 2 + (index + 1)}
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      {item.subcategoryName}
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      {item.parentcategory.categoryName}
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      <img
                        src={path + item.categoryImage}
                        alt=""
                        className="rounded h-[50px] w-[50px]"
                      />
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      <p>{item.subcategoryDes}</p>
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      <div className="flex space-x-5 text-center justify-center cursor-pointer">
                        <MdDelete
                          className="mr-3"
                          onClick={() => deletedata(item._id)}
                        />{" "}
                        |{" "}
                        <Link href={`/add-sub-category/${item._id}`}>
                          <FaRegEdit />
                        </Link>
                      </div>
                    </td>
                    <td class="border border-gray-300 p-2 flex space-x-2 justify-center">
                      <button class="text-green-400 hover:text-red-700 text-center">
                        {item.subcategoryStatus == 1 ? "Active" : "Deactive"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>Subcategory is not found</td>
              </tr>
            )}
          </tbody>
        </table>
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </form>
    </div>
  );
}
