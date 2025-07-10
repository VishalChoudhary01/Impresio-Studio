import React from 'react'
import { MdOutlineFilterAltOff } from "react-icons/md";
const FilterDrawer = ({toggleDrawer,openDrawer}) => {
  return (
    <>
    <aside className={`bg-teal-950  text-white border-t border-l border-slate-500/30  absolute left-0 top-16 transition-all duration-500  w-60 h-screen z-20 py-9 pl-5 ${openDrawer?"translate-x-0":"-translate-x-full"}`}>
  <div onClick={toggleDrawer} className='flex  justify-end px-3 md:text-lg text-teal-100 hover:text-teal-50 transition-colors'>
    <MdOutlineFilterAltOff className='cursor-pointer'/>
  </div>
  <h3 className='text-teal-100 text-lg w-full border-b border-slate-500/45 pb-2'>Filters</h3>
  </aside>
    {openDrawer &&<span onClick={toggleDrawer} className='fixed md:hidden top-16 bg-neutral-400/50 backdrop-blur inset-0'/>}

    </>
  )
}

export default FilterDrawer