import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { SERVER_URL } from '../../../config/config'
import { updateName } from '../../../redux/slices/taskSlice'
import { Input } from '@mui/material';
import { useRef } from 'react'
import { handleClickOutSide } from '../../../services/functions'


const EditName = ({ value, taskId, setEditName}) => {
const dispatch = useDispatch()
const nameRef = useRef()
useEffect(()=>{
  handleClickOutSide(nameRef, ()=>setEditName(false))
}, [nameRef])
const [newName, setNewName] = useState('')
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      buttonRef.current.click();
    }
  };
    const handleSubmit = async ()=>{
        setEditName(false)
    dispatch(updateName({name: newName, id:taskId}))
    const {data} = await toast.promise(
        axios.put(
            `${SERVER_URL}/api/workspace/tasks/update/name/${taskId}`,
            {name: newName},
            {withCredentials:true}
            ),
            {
                pending: 'Updating',
                success: 'Name Changed',
                error: 'Error Occured'
            },
            {autoClose:2000}
            )
        }
        const buttonRef = useRef(null);

  return (
    <>
 <input
 ref={nameRef}
 onKeyPress={handleKeyPress}
 onKeyDown={(event)=>event.stopPropagation()}
 type='text'
 onChange={(e)=>setNewName(e.target.value)}
 autoFocus
 className="text-[#6884f7] focus:outline-none rounded-[5px] p-1" 
 defaultChecked defaultValue={value} 
  />
  <button ref={buttonRef} onClick={handleSubmit} type='submit' className='text-[black]'></button>
 </>

  )
}

export default EditName