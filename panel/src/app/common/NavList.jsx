"use client"
import { IoMdColorPalette } from "react-icons/io";
import { GrHistory } from "react-icons/gr";
import { PiSlidersHorizontal } from "react-icons/pi";
import {
    FaChevronDown,
    FaChevronRight,
    FaUser,
    FaPalette,
    FaList,
    FaProductHunt,
    FaLayerGroup,
    FaBoxOpen,
    FaBook,
    FaShoppingCart,
    FaSlidersH,
    FaClipboardList,
    FaSignOutAlt,
    FaEnvelope,
  } from "react-icons/fa";
  import { CgProfile } from "react-icons/cg";
  import { IoTimeOutline } from "react-icons/io5";
  import { RxDashboard } from "react-icons/rx";
export let navList=[
    {
        'navName':'Dashboard',
        'icon':  <RxDashboard />,
        'link':'/dashboard',
        'subMenu':[]
        
    },
    {
        'navName':'Profile',
        'icon': <CgProfile />,
        'link':'/profile',
        'subMenu':[]
        
    },
    {
        'navName':'Color',
        'icon':<IoMdColorPalette />,
        'subMenu':[
            {
               'navName':'Add Color', 
               'link':'/add-color'
            },
            {
                'navName':'View Color', 
                'link':'/view-color'
             }
        ]
    },
    {
        'navName':'Size',
        'icon': <FaList />,
        'subMenu':[
            {
               'navName':'Add Size', 
               'link':'/add-size',
               
            },
            {
                'navName':'View Size', 
                'link':'/view-size'
             }
        ]
    },
    {
        'navName':'Category',
        'icon':  <FaLayerGroup /> ,
        'subMenu':[
            {
               'navName':'Add Category', 
               'link':'/add-parent-category'
            },
            {
                'navName':'View Category', 
                'link':'/view-parent-category'
             }
        ]
    },
    {
        'navName':'Sub Category',
        'icon':      <FaClipboardList />,
        'subMenu':[
            {
               'navName':'Add Sub Category', 
               'link':'/add-sub-category'
            },
            {
                'navName':'View Sub Category', 
                'link':'/view-sub-category'
             }
        ]
    },
    {
        'navName':'Products',
        'icon': <FaProductHunt /> ,
        'subMenu':[
            {
               'navName':'products Details', 
               'link':'/products-details'
            },
            {
                'navName':'products Items', 
                'link':'/products-items'
             }
        ]
    },
    {
        'navName':'Story',
        'icon': <GrHistory /> ,
        'subMenu':[
            {
               'navName':'Story Details', 
               'link':'/story-details'
            },
            {
                'navName':'Story View', 
                'link':'/story-view'
             }
        ]
    },
    {
        'navName':'Order',
        'icon':    <FaShoppingCart  /> ,
        'link':'/order',
        'subMenu':[]
        
    },
    {
        'navName':'Slider',
        'icon': <PiSlidersHorizontal />,
        'subMenu':[
            {
               'navName':'Slider Details', 
               'link':'/slider-details'
            },
            {
                'navName':'Slider View', 
                'link':'/slider-view'
             }
        ]
    }
  
]