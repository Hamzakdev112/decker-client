import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateName } from '../../../redux/slices/taskSlice'
import { useRef } from 'react'
import { handleClickOutSide } from '../../../services/functions'
import { updateTaskName } from '../../../apiCalls/tasksApis'


const EditName = ({ value, taskId, setEditName}) => {
const dispatch = useDispatch()
const nameRef = useRef()
useEffect(()=>{
  handleClickOutSide(nameRef, ()=>setEditName(false))
}, [nameRef])
const [newName, setNewName] = useState(value)
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      buttonRef.current.click();
    }
  };
    const handleSubmit = async ()=>{
       dispatch(updateName({name: newName, id:taskId}))
      setTimeout(()=>{
        setEditName(false)
      },0)
    updateTaskName(taskId, newName)
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