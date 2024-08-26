import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center py-3 bg-gray-800'>
      <div className='font-bold  px-10  text-white'><span className=''>&lt;</span><span>Pass</span>
      <span className='text-green-500'>Manager/&gt;</span>
      </div>
      <div className=''>
      <button className='text-white ring-1 ring-white absolute right-[3rem] top-[0.8rem] rounded-full bg-green-500 justify-between flex'>
        <img className='bg-green-500 w-6 rounded-full' src="/icons/GitHub_logo.png" alt="" /><span className='font-bold px-1'>Github</span>
      </button>
      </div>
    </nav>  )
}

export default Navbar
