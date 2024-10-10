"use client"
import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import img1 from '../../img/logo1.png';
import Image from "next/image";
export default function page() {
  return (
    <div class="w-[90%] my-[20px] mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-[30px] font-bold w-full bg-gray-200 rounded">
        Profile
      </h1>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <h1 className="text-[20px] w-full bg-gray-200 font-bold p-2">
        Social Links
      </h1>
      <div class="mb-4 flex space-x-2 mt-[10px]">
        <CiFacebook className="text-[30px] mt-2" />
        <input
          type="url"
          id="facebook"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div class="mb-4 flex space-x-2 mt-[10px]">
        <FaYoutube className="text-[30px] mt-2" />

        <input
          type="url"
          id="facebook"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div class="mb-4 flex space-x-2 mt-[10px]">
        <FaInstagram className="text-[30px] mt-2" />
        <input
          type="url"
          id="facebook"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div class="mb-4">
        <h1 className="font-bold mb-2">Logo</h1>
       <Image src={img1} width={50} height={50}  className="ml-5"/>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="password">
          New Password
        </label>
        <input
          placeholder="........."
          type="password"
          id="password"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button class=" mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Update Password
        </button>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="otp">
          OTP
        </label>
        <input
          type="number"
          id="otp"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button class=" mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Update Email
        </button>
      </div>
    </div>
  );
}
