"use client"
import Navbar from "./components/moleclues/Navbar";
import Sidebar from "./components/moleclues/Sidebar";
import Footer from "./components/moleclues/Footer";
import FilterDrawer from "./components/moleclues/FilterDrawer";
import { useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";


export default function Home() {
const [openSideMenu,setOpenSideMenu]=useState(false);
const [openDrawer,setOpenDrawer]=useState(false);

const toggleSideMenu=()=>{
  setOpenDrawer(false);
  setOpenSideMenu((prevState)=>!prevState)
}

const toggleDrawer=()=>{
  setOpenSideMenu(false)
  setOpenDrawer((prevState)=>!prevState)
}

  return (
    <div className="w-full flex flex-col   min-h-screen relative overflow-hidden">
      <Navbar toggleMenu={toggleSideMenu} openMenu={openSideMenu}/>
      <Sidebar toggleMenu={toggleSideMenu} openMenu={openSideMenu}/>
      <FilterDrawer toggleDrawer={toggleDrawer} openDrawer={openDrawer}/>
      <main className="grow px-4 py-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDrawer}>
          <MdOutlineFilterAlt />
          <p>Filter</p>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
