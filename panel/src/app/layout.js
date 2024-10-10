"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./common/Sidebar";
import Header from "./common/Header";
import { getURL } from "next/dist/shared/lib/utils";
import { usePathname } from "next/navigation";
import MainLayout from "../../MainLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  let pathName = usePathname();
  console.log(pathName);
  return (
    <MainLayout>
  <html lang="en">
      {pathName === "/" ? (
        <body className={inter.className}>{children}</body>
      ) : (
        <body className={inter.className}>
          <div className="grid grid-cols-[15%_auto]">
            <Sidebar />

            <div className="bg-white">
              <Header />
              {children}
            </div>
          </div>
        </body>
      )}
    </html>
    </MainLayout>
  
  );
}
