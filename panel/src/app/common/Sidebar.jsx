"use client";
import React, { useEffect, useState } from "react";
import { navList } from "./NavList";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";


export default function Sidebar() {
  let token = useSelector((store) => {
    return store.loginReducer.token;
  });
  let [openMenu, setOpenMenu] = useState(-1);

  // Function to toggle open/close for each menu
  const handleToggle = (index) => {
    setOpenMenu(openMenu === index ? -1 : index); // Toggle the same index or close if open
  };

  // List of items without dropdown icons
  const noDropdownIconItems = ["Dashboard", "Profile", "Order"];
  
  return (
    <div className="h-auto bg-white">
      <h1 className="text-[25px] text-purple-900 p-3">Frank & Oak</h1>
      <h3 className="text-purple-900 text-center p-3 font-bold">
        ecommerce Components
      </h3>

      {navList.map((items, index) => {
        return (
          <div key={index} className="text-purple-800 bg-white font-bold">
            <div className="flex justify-between items-center w-full p-2">
              {/* Left-aligned name and icon */}
              <div className="flex items-center">
                <div className="text-[20px] mr-2">{items.icon}</div>
                <h3
                  className="cursor-pointer"
                  onClick={() => handleToggle(index)}
                >
                  {items.navName}
                </h3>
              </div>

              {/* Right-aligned dropdown icon, rendered conditionally */}
              {!noDropdownIconItems.includes(items.navName) && (
                <RiArrowDropDownLine
                  className={`text-[35px] cursor-pointer transform  duration-300 ${
                    openMenu === index ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => handleToggle(index)}
                />
              )}
            </div>
            <hr />

            {items.subMenu.length >= 1 ? (
              <ul
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openMenu === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                {items.subMenu.map((sItems, subIndex) => {
                  return (
                    <li key={subIndex} className="pl-[40px] py-2">
                      <Link href={sItems.link}>{sItems.navName}</Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}
