import React, { useState } from 'react'
import { CirclePicker } from 'react-color'
import { useDispatch, useSelector } from 'react-redux'
import { setColor } from '../../../redux/slices/createSpace'

const AddCustomizations = () => {
  const {color} = useSelector((state)=>state.createSpace)
  const dispatch = useDispatch()
  return (
    <div className='w-[90%]  flex flex-col items-center text-center mx-auto mt-[30px] '>
            <h1 className='mb-[10px] mt-[10px] text-[1.3em] font-normal'>Upload Picture</h1>
        <label htmlFor='pfp-input' className='hover:opacity-[0.8] cursor-pointer hover:scale-[1.020] transition-all duration-300 w-[200px] flex items-center justify-center aspect-square border-[10px] object-cover border-[black]'>
            <img src="/assets/images.png" alt="" />
        </label>
        <input type="file" className='hidden' id='pfp-input' />
        <div className=''>
            <h1 className='mb-[10px] mt-[10px] text-[1.3em] font-normal'>Pick Theme Color (Default Red)</h1>
        <CirclePicker circleSize={15}  width='100%' color={color} onChangeComplete={(color)=>dispatch(setColor(color.hex))}  />
        </div>
    </div>
  )
}

export default AddCustomizations