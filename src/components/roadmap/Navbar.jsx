import React from 'react'

const Navbar = () => {
  return (
    <div className=' w-[100%]'>
        <div className='flex items-center justify-between w-[90%] mx-auto p-5'>
        <div>
            <h1 className='text-[2em]'>MONSTER</h1>
        </div>
        <div className='flex gap-[1em]'>
            <span>Courses</span>
            <span>Account</span>
        </div>
    </div>
        </div>
  )
}

export default Navbar