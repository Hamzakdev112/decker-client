import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { updateColumnsApi } from '../../../apiCalls/spacesApis';
import { useDispatch, useSelector } from 'react-redux';
import { updateColumns } from '../../../redux/slices/spaceSlice';

const AddColumn = ({}) => {
  const {singleSpace} = useSelector(state=>state.spaces)
  const dispatch = useDispatch()
  const handleUpdate = async(column)=>{
    const data = await updateColumnsApi(column, singleSpace?._id)
    dispatch(updateColumns({columns:data.columns, id:singleSpace._id}))
  }

  return (
    <div className='p-[1em] '>
      <h1 className=' my-[1em] text-[1.3em]'>FIELDS</h1>
      <div className='flex flex-col gap-2 text-[0.8em] items-start'>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button onClick={()=>handleUpdate('name')} className='w-[100%] flex justify-start'>Name</button>{
          singleSpace?.columns?.includes('name')&&
          <DoneIcon color='primary' fontSize='small' />
          
          }</div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button onClick={()=>handleUpdate('assignee')} className='w-[100%] flex justify-start'>Assignee</button>{
          singleSpace?.columns?.includes('assignee') &&
          <DoneIcon color='primary' fontSize='small' />
          }</div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button onClick={()=>handleUpdate('assigner')} className='w-[100%] flex justify-start'>Assigner</button>
        {
          singleSpace?.columns?.includes('assigner') &&
          <DoneIcon color='primary' fontSize='small' />
          }</div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button onClick={()=>handleUpdate('priority')} className='w-[100%] flex justify-start'>Prioirity</button>
        {
          singleSpace?.columns?.includes('priority') &&
          <DoneIcon color='primary' fontSize='small' />
        }</div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button onClick={()=>handleUpdate('status')} className='w-[100%] flex justify-start'>Status</button>
        {
          singleSpace?.columns?.includes('status') &&
          <DoneIcon color='primary' fontSize='small' />}
          </div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button onClick={()=>handleUpdate('createdAt')} className='w-[100%] flex justify-start'>Assigned On</button>
        {
          singleSpace?.columns?.includes('createdAt') &&
          <DoneIcon color='primary' fontSize='small' />
          }</div>
        <div className='cursor-pointer flex justify-between transition-all duration-300 rounded-[5px] hover:bg-[#ebebeb] p-[0.5em] w-[100%]'><button onClick={()=>handleUpdate('updatedAt')} className='w-[100%] flex justify-start'>Updated On</button>
        {
          singleSpace?.columns?.includes('updatedAt') &&
          <DoneIcon color='primary' fontSize='small' />}</div>
      </div>
    </div>
  )
}

export default AddColumn