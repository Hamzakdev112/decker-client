import React from 'react'
import DoneIcon from '@mui/icons-material/Done';

const AddColumn = () => {
  return (
    <div className='p-[1em] '>
      <h1 className=' my-[1em] text-[1.3em]'>FIELDS</h1>
      <div className='flex flex-col gap-2 text-[0.8em] items-start'>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button className=' '>Name</button><DoneIcon fontSize='small' /></div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button className=' '>Assignee</button><DoneIcon fontSize='small' /></div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button className=' '>Assigner</button><DoneIcon fontSize='small' /></div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button className=' '>Prioirity</button><DoneIcon fontSize='small' /></div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button className=' '>Status</button><DoneIcon fontSize='small' /></div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button className=' '>Assigned On</button><DoneIcon fontSize='small' /></div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button className=' '>Updated On</button><DoneIcon fontSize='small' /></div>
      </div>
    </div>
  )
}

export default AddColumn