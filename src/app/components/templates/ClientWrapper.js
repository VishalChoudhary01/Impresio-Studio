"use client";
import React, { useState } from "react";
import Navbar from "../moleclues/Navbar";
import Sidebar from "../moleclues/Sidebar";
import Footer from "../moleclues/Footer";

export default function ClientWrapper({ children }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleSideMenu = () => {
    setOpenSideMenu((prevState) => !prevState);
  };

  return (
    <div className="w-full flex flex-col min-h-screen relative overflow-hidden dark:bg-[#172b23]">
      <Navbar toggleMenu={toggleSideMenu} openMenu={openSideMenu} />
      <Sidebar toggleMenu={toggleSideMenu} openMenu={openSideMenu} />
      <main className="grow py-6">{children}</main>
      <Footer />
    </div>
  );
}
