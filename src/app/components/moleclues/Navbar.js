"use client"
import React from 'react'
import Logo from '../atoms/Logo'
import { HiMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import Toggle from './Toggle';

const Navbar = ({toggleMenu, openMenu}) => {
  return (
    <nav className='md:h-16 h-[65px] w-full bg-teal-70 bg-teal-950   backdrop-blur-3xl flex justify-between items-center md:px-5 px-2.5'>
        <Logo/>



    <div className='md:block hidden'>
    <Toggle/>
    </div>
    
    <div className='md:hidden block text-teal-50/70 text-2xl' onClick={toggleMenu}>
        {openMenu?<CgClose/>:<HiMenuAlt3 />}
    </div>
   


    </nav>
  )
}

export default Navbar