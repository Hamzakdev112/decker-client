import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectMembers({members, setMember}) {
  const [isOpen, setisOpen] = useState(false)
  const handleOpen = (e)=>{
    e.preventDefault()
    setisOpen(prev=>!prev)
  }
  const ref = useDetectClickOutside({ onTriggered: ()=>setisOpen(false) });
  const handleSetMember = (id)=>{
    setMember(id)
    setisOpen(false)
  }
  
  return (

    <div 
    ref={ref}
    className='relative'>
        <button
        onClick={handleOpen}
         className='w-[30px] flex justify-center items-center'>
          <img className='w-[30px]' src="/assets/user.png" alt="" />
          </button>
    <div  className={`boxshadow left-[0] transition-all duration-[0.3s] absolute ${isOpen && '!h-[200px]'} h-[0px] overflow-auto overflow-x-hidden bg-white w-[200px]`}>
      {
        isOpen &&
        members?.map((member)=>(
          <div
          key={member._id}
          onClick={()=>handleSetMember(member._id)}
          // onClick={handleSetMember(member._id)}
           className='hover:bg-[#ebf1fd] cursor-pointer flex items-center gap-2 p-3  '>
            <img src="/assets/user.png" className='rounded-[50%] w-[30px]' alt="" />
            <span>{member?.firstName} {member?.lastName}</span>
      </div>
          ))
  }
  </div>
      </div>
  );
}
