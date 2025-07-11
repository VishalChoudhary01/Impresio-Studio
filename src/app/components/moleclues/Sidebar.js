// Sidebar.jsx
import React from 'react'
import Toggle from './Toggle'

const Sidebar = ({toggleMenu, openMenu}) => {
  return (
    <>
      {openMenu && (
        <span 
          onClick={toggleMenu} 
          className='fixed md:hidden top-16  bg-neutral-900/50 backdrop-blur inset-0 z-30'
        ></span>
      )}
      <aside 
        className={`dark:bg-teal-950 bg-teal-100 md:hidden  dark:text-white text-gray-900 border-l border-teal-800 absolute right-0 top-16 transition-all duration-300 w-60 h-screen z-40 py-9 pl-5 ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='absolute top-2 right-2'>
          <Toggle/>
        </div>
        
        <h3 className='dark:text-teal-50 text-gray-900 text-lg w-full border-b  border-teal-800 pb-2 mb-4'>
          Menu
        </h3>
        
        <div className="space-y-3">
          {['Home', 'Photographers', 'Pricing', 'About'].map((item) => (
            <div 
              key={item}
              className="dark:text-teal-200 text-gray-900 hover:text-white cursor-pointer transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}

export default Sidebar