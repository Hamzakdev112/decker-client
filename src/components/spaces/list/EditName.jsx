import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { SERVER_URL } from '../../../config/config'
import { updateName } from '../../../redux/slices/taskSlice'
import { Input } from '@mui/material';


const EditName = ({ value, taskId, setEditName}) => {
const dispatch = useDispatch()
const [newName, setNewName] = useState('')

const handleSubmit = async (e)=>{
    e.preventDefault()
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


  return (
    <form onSubmit={handleSubmit} action="">
 <input
 type='text'
  onChange={(e)=>setNewName(e.target.value)}
  autoFocus
  className=" focus:outline-none  rounded-[5px] p-1" 
  defaultChecked defaultValue={value} 
  />

    </form>

  )
}

export default EditName