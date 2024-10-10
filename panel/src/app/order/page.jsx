"use client";
import React from "react";
import Image from "next/image";
import img1 from "../../img/1.jpg";
export default function page() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div class="p-4 border border-gray-300 shadow-md rounded-lg w-[95%] mx-auto my-5">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold p-[10px] rounded bg-gray-200 w-full">
          Our Story's
        </h2>
      </div>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th>
              <input type="checkbox" /> Delete
            </th>
            <th class="border border-gray-300 p-2">Sr.No</th>
            <th class="border border-gray-300 p-2">Order Id</th>

            <th class="border border-gray-300 p-2">Name</th>
            <th class="border border-gray-300 p-2">Quantity</th>
            <th class="border border-gray-300 p-2">Price</th>
            <th class="border border-gray-300 p-2">Date</th>
            <th class="border border-gray-300 p-2">Status</th>
            <th class="border border-gray-300 p-2">View</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2">
              <input type="checkbox" name="" id="" />
            </td>
            <td class="border border-gray-300 p-2 text-center">1</td>
            <td class="border border-gray-300 p-2 text-center">Frank1</td>

            <td class="border border-gray-300 p-2 text-center">Mehar Hafiza</td>
            <td class="border border-gray-300 p-2 text-center">2</td>
            <td class="border border-gray-300 p-2 text-center">R.s 2000</td>
            <td class="border border-gray-300 p-2 text-center">
              <div className="flex space-x-5 text-center justify-center">
                16/08/2024
              </div>
            </td>
            <td class="border border-gray-300 p-2">processing....</td>
            <td class="border border-gray-300 p-2 flex space-x-2 justify-center">
              <button
                className="bg-green-600 text-white p-1 rounded"
                onClick={() => setShowModal(true)}
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Order Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="grid grid-cols-2">
                    <div className="flex space-x-5">
                      <Image src={img1} width={100} height={50} />
                      <div>
                        <h1 className="text-red-600 font-bold">
                          The Men causal dress in light blue colour
                        </h1>
                        <ul>
                          <li>Price: 2000 R.s</li>
                          <li>Quantity: 2</li>
                          <li>Size: XXL</li>
                          <li>Colour: lightBlue</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-black p-3">
                      <h1 className="font-bold"> Shipping Adress</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Earum, minus?
                      </p>
                      <h1 className="font-bold text-center">Order Summary</h1>
                      <ul>
                        <li className="font-bold">
                          SubTotal: <span className="font-light">3000 R.s</span>
                        </li>
                        <li className="font-bold">
                          Cash/Pay: <span className="font-light">0 R.s</span>
                        </li>
                        <li className="font-bold">
                          Shipping: <span className="font-light">3000 R.s</span>
                        </li>
                        <li className="font-bold">
                          Grand Total:{" "}
                          <span className="font-light">4000 R.s</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
