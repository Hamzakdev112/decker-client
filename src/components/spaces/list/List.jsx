import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TimeAgo from 'javascript-time-ago'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import en from 'javascript-time-ago/locale/en'
import {setAddColumnOpen} from '../../../redux/slices/spaceSlice'




const List = () => {
    const {tasksBySpaceId} = useSelector(state=>state.tasks)
  const {singleSpace} = useSelector(state=>state.spaces)
  const dispatch = useDispatch()
  TimeAgo.addDefaultLocale(en)  
  const timeago = new TimeAgo('en-PK')
  const updatedColumns = []
   singleSpace?.columns.map((column)=>{
    if(column.field === 'name'){
      return updatedColumns.push({...column, renderCell:(params)=>{
        const value = params.value
        return (
          <h1 className=''>{value}</h1>
        )
      }})
    }
    else if(column.field === 'assignee'){
      return updatedColumns.push({...column, renderCell:(params)=>{
        const value = params.value
        return (
          <img src={"/assets/user.png"} className='w-[30px] h-[30px]' />
        )
      }})
    }
    else if(column.field === 'dueDate'){
      return updatedColumns.push({...column, renderCell:(params)=>{
        const {value} = params
        const overDue = new Date(value) > new Date(Date.now())
        return (
          <span className={overDue ? `text-[#6870fa]`: `text-[red]`}>{value && timeago.format(new Date(value))}</span>
        )
      }})
    }
    else if(column.field === 'status'){
      return updatedColumns.push({...column, renderCell:(params)=>{
        const {value} = params
        return (
          <span className={`
            p-[10px] rounded-[5px] w-[100px] flex justify-center !text-[white]
            ${value == 'IN PROGRESS' && 'bg-[red]'} 
            ${value == 'INTERN TASK' && 'bg-[#00ade2]'} 
            
            `}>{value}</span>
        )
      }})
    }
    updatedColumns.push({...column})
  })
  updatedColumns.push({field:'add', headerName:'add',sortable:false, renderHeader:()=>{
    return (
      <button 
      className='text-[20px] hover:text-[#00ade2] w-[20px] flex justify-center items-center p-2 h-[20px]'
       onClick={()=>dispatch(setAddColumnOpen(true))}
       ><AddCircleOutlineIcon /></button>
    )
  }})
  return (
      <div className="w-[100%] h-[100%]" >
        {
  tasksBySpaceId && singleSpace &&
  <DataGrid
  sx={{
    border:0,
    fontSize: '0.8em',
  }}
  getRowClassName={params=>'cursor-pointer hover:text-[#6870fa]'}
  className="border-[white] "
  rows={tasksBySpaceId}
  getRowId={(row)=>row?._id}
  columns={updatedColumns}
  disableColumnMenu
  
  // components={{ Toolbar: GridToolbar }}
  />
}
    </div>
  )
}

export default List