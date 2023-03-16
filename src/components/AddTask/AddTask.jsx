import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Select, TextareaAutosize } from '@material-ui/core';
import SelectMembers from './SelectMembers';
import { useEffect } from 'react';
import { getMembers } from '../../apiCalls/spacesApis';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../config/config';
import { useDispatch } from 'react-redux';
import { getTasksBySpaceId } from '../../apiCalls/tasksApis';
import DatePicker from 'react-date-picker';
import {BeatLoader} from 'react-spinners'
import { toast } from 'react-toastify';
import { MenuItem } from '@mui/material';


export default function AddTask({spaceId, setAddTaskDialog}) {
    const [members, setMembers] = useState([])
    const [member, setMember] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('Normal')
    const [dueDate, setDueDate] = useState(new Date());
    const [addDate, setAddDate] = useState(false)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const body = {
    name,
    description,
    priority,
    dueDate: addDate ? dueDate : null,
    assignee: member,
  }
  const dispatch = useDispatch()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const {data} = await axios.post(`${SERVER_URL}/api/workspace/tasks/new/${spaceId}`, body, {
        withCredentials:true
      })
      setLoading(false)
      setAddTaskDialog(false)
      toast.success('Task Added', {autoClose:2000})
      getTasksBySpaceId(dispatch,spaceId)
    }catch(err){
      setError(err.response.data)
      setLoading(false)
    }
  }

    console.log(member)
    useEffect(()=>{
        getMembers(spaceId, setMembers)
    }, [])


  return (
    <form className='py-5' onSubmit={handleSubmit}>
      <div className='flex gap-[20px]  w-[600px] items-center '>
        <TextField
          onChange={(e)=>setName(e.target.value)}
          id="task-name"
          label="Task Name"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <span className='text-[14px] ml-[20px]'>For</span>
        <SelectMembers setMember={setMember} member={member} members={members} />
        {
            addDate ?
            <DatePicker
            className="w-[0px]" 
            monthPlaceholder='mm'
            dayPlaceholder='dd'
            yearPlaceholder='yyyy'
            onChange={addDate && setDueDate} value={dueDate} />
            : 
            <button 
            onClick={()=>setAddDate(true)}
            className1='bg-[#1e5de6]  w-[100px] p-2 text-white rounded-[5px] text-[13px]'>Due Date</button>
          }
      </div>
      <div className='flex-col flex gap-3'>
      
      <TextareaAutosize
      onChange={((e)=>setDescription(e.target.value))}
      maxRows={4}
      placeholder="Description"
      style={{padding:'10px', width: '100%', height:'300px', border:'1px solid #bbbbbb', marginTop: '20px' }}
      />
      <span className='text-[14px]'>Priority</span>
      <Select
      
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    renderValue={(selected)=>{
      if(!selected){
        return <span className='!text-[black]'>Please select</span>
      }
      return <span>{selected}</span>
    }}
    label="Priority"
    className=' w-[100px]'
    onChange={(e)=>setPriority(e.target.value)}
  >
    <MenuItem sx={{color:'green', fontSize:'14px' }} value="Normal">Normal</MenuItem>
    <MenuItem sx={{color:'blue', fontSize:'14px' }} value='High'>High</MenuItem>
    <MenuItem sx={{color:'red', fontSize:'14px' }} value="Urgent">Urgent</MenuItem>
  </Select>
         
      {
        error && <span className='text-[red]'>{error}</span>
      }
        <div>{
          loading ? <BeatLoader color='red' /> :
          <button className='bg-[red] p-2 text-white rounded-[5px] text-[13px]'>ADD TASK</button>
          }
        </div>
          </div>
      </form>
  );
}
