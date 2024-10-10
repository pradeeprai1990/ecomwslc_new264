"use client"
import React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import img1 from "../../img/img1.png";
import img2 from "../../img/img2.png";
import img3 from "../../img/img3.png";
import img4 from "../../img/img4.png";
import Image from "next/image";
export default function page() {
  return (
    <div className="flex space-x-2 w-[80%] mx-auto">
  
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        width={500}
        height={300}
      />
      
    </div>
  );
}
