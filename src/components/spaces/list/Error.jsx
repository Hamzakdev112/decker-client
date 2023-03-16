import React from 'react'
import { useSelector } from 'react-redux';

const Error = () => {
    const { error:tasksError } = useSelector((state) => state.tasks);
    const { error:spaceError } = useSelector((state) => state.spaces);
    console.log(spaceError)
    console.log(tasksError)
  return (
    <div className='w-[100%] h-[100%] flex flex-col justify-center items-center'>
        <img src="/assets/error.webp" alt="" />
        <span className='bg-[red] rounded-[20px] p-3 text-[25px] text-[white]'>
            {spaceError ? spaceError : tasksError && tasksError}
        </span>
        </div>
  )
}

export default Error