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
export default function page() {
  let token = useSelector((store) => {
    return store.loginReducer.token;
  });
  let [allId, setallId] = useState([]);
  let [product, setProduct] = useState([]);
  let [path, setPath] = useState("");
  let [search, setSearch] = useState(null);
  //view product function
  let viewProduct = () => {
    axios
      .get(`http://localhost:8000/admin/product/view-product`, {
        params: search,
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((finalres) => {
        setProduct(finalres.data);
        setPath(finalres.path);
      });
  };
  //search form function
  let searchform = (e) => {
    e.preventDefault();
    let productName = e.target.productName.value;

    let obj = { productName };
    console.log(obj);

    setSearch(obj);
  };

  //delete product function
  let deletedata = (id) => {
    axios
      .delete(`http://localhost:8000/admin/product/delete-product/${id}`)
      .then((res) => {
        viewProduct();
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
        .post(`http://localhost:8000/admin/product/deletemulti`, { ids: allId })
        .then((res) => {
          console.log(res.data);
          viewProduct();
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
  useEffect(() => {
    viewProduct();
  }, [search]);
  return (
    <div class="border border-gray-300 shadow-md rounded-lg w-[95%] mx-auto my-5 overflow-x-hidden">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
          Product Items
        </h2>
      </div>
      {/* //search form start */}
      <div className="w-full flex pl-5">
        <form action="" className="border w-full" onSubmit={searchform}>
          <input
            type="text"
            name="productName"
            id="search"
            placeholder="Search by Name"
            className="py-2 px-3 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 py-1 px-3 text-white ml-10 w-[100px] h-[40px] rounded"
          >
            Search
          </button>
        </form>
      </div>
      {/* search form end */}
      <form action="">
        <div className="overflow-x-auto pl-5">
          <table class="min-w-full border-collapse  border border-gray-300">
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
                <th class="border border-gray-300 p-1">Sr.No</th>
                <th class="border border-gray-300 p-1">Product Name</th>
                <th class="border border-gray-300 p-1">Category Name</th>
                <th class="border border-gray-300 p-1"> Subcategory Name</th>
                <th class="border border-gray-300 p-1">Size</th>
                <th class="border border-gray-300 p-1">Color</th>
                <th class="border border-gray-300 p-1">Price</th>
                <th class="border border-gray-300 p-1">Mrp</th>
                <th class="border border-gray-300 p-1">Thumbail</th>
                <th class="border border-gray-300 p-1">Gallery</th>
                <th class="border border-gray-300 p-1">Description</th>
                <th class="border border-gray-300 p-1">Actions</th>
                <th class="border border-gray-300 p-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {product.length >= 1 ? (
                product.map((item, index) => {
                  console.log("itemssss", item);
                  return (
                    <tr>
                      <td class="border border-gray-300 p-1">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onClick={delAllIds}
                          value={item._id}
                        />
                      </td>
                      <td class="border border-gray-300 p-1 text-center">
                        {index + 1}
                      </td>
                      <td class="border border-gray-300 p-1 text-center">
                        {item.productName}
                      </td>
                      <td class="border border-gray-300 p-1 text-center">
                        {item.productParentCat.categoryName}
                      </td>
                      <td class="border border-gray-300 p-1 text-center">
                        {item.productSubParentCat.subcategoryName}
                      </td>
                      {/* size loop again on items */}
                      <td class="border border-gray-300 p-1 text-left">
                        <ol className="list-decimal list-inside">
                          {item.productSize.map((sizeItem, sizeIndex) => (
                            <li key={sizeIndex}>{sizeItem.sizeName}</li>
                          ))}
                        </ol>
                      </td>

                      {/* size loop again on items end*/}
                      {/* color loop again on items */}
                      <td class="border border-gray-300 p-1 text-left">
                        <ol className="list-decimal list-inside">
                          {item.productColor.map((colorItem, colorIndex) => (
                            <li key={colorIndex}>{colorItem.colorName}</li>
                          ))}
                        </ol>
                      </td>

                      {/* color loop again on items end */}
                      <td class="border border-gray-300 p-1 text-center">
                        <p>{item.productPrice}</p>
                      </td>
                      <td class="border border-gray-300 p-1 text-center">
                        <p>{item.productMrp}</p>
                      </td>
                      <td class="border border-gray-300 p-1 text-center">
                        <img
                          src={path + item.productImage}
                          alt=""
                          className="rounded h-[50px] w-[50px]"
                        />
                      </td>
                      {/* Display product gallery */}
                      <td class="border border-gray-300 p-1 text-center">
                        {item.productGallery &&
                        item.productGallery.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2">
                            {" "}
                            {item.productGallery.map(
                              (galleryItem, galleryIndex) => (
                                <img
                                  key={galleryIndex}
                                  src={path + galleryItem}
                                  alt={`Gallery Image ${galleryIndex}`}
                                  className="rounded h-[50px] w-[50px]"
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <span>No Gallery</span> // Fallback if no gallery images
                        )}
                      </td>

                      <td class="border border-gray-300 p-1 text-center">
                        <p>{item.productDes}</p>
                      </td>
                      <td class="border border-gray-300 p-1 text-center">
                        <div className="flex space-x-5 text-center justify-center cursor-pointer">
                          <MdDelete
                            className="mr-3"
                            onClick={() => deletedata(item._id)}
                          />{" "}
                          |
                          <Link href={`/products-details/${item._id}`}>
                            <FaRegEdit />
                          </Link>
                        </div>
                      </td>
                      <td class="border border-gray-300 p-1 flex space-x-2 justify-center">
                        <button class="text-green-400 hover:text-red-700 text-center">
                          {item.colorStatus == 1 ? "Active" : "Deactive"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td class="border border-gray-300 p-1" colSpan="8">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}
