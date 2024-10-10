"use client"
import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import user from "../../img/user.png";
import Image from "next/image";
import { navList } from "./NavList";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../slice/loginSlice";
import { redirect } from "next/navigation";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let getToken =useSelector((state)=>{
    return state.loginReducer.token;

})
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  let dispatch = useDispatch()
  let logout=()=>{
    dispatch(logOut())
  }

  useEffect(()=>{
    if(getToken==""){
        redirect("/")
    }
  },[getToken])
  return (
    <>
      <div className="flex justify-between my-[10px] p-[10px]">
        <div className="flex space-x-5">
          <FaBars className="mt-[8px] cursor-pointer text-[20px]" />
          <h1 className="font-bold text-[20px]">Dashboard</h1>
        </div>
        <div>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                id="menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <Image src={user} width={50} height={50} className="rounded" />
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {dropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Name
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Email
                  </a>
                  <a
                   onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    role="menuitem"
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="my-2 pl-[20px]">
        <a href="/">
          Home 
        </a>
      </div>

      <hr />
    </>
  );
}
