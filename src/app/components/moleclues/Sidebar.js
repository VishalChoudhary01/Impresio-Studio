import React from 'react'
import Toggle from './Toggle'
const Sidebar = ({toggleMenu,openMenu}) => {
  return (
    <>
    {openMenu &&<span onClick={toggleMenu} className='fixed md:hidden top-16 bg-neutral-400/50 backdrop-blur inset-0'></span>}
    <aside className={`bg-teal-950 md:hidden text-white border-t border-l border-slate-500/30 rounded-l-md absolute right-0 top-16 transition-all duration-500  w-60 h-screen z-40 py-9 pl-5 ${openMenu?"translate-x-0":"translate-x-full"}`}>
  <div className='absolute top-2 right-2'>
  <Toggle/>
  </div>
  
  <h3 className='text-teal-100 text-lg w-full border-b border-slate-500/45 pb-2'>Menu</h3>

      </aside>
    </>
  )
}

export default Sidebar