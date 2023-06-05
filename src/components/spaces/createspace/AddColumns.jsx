import * as React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import TitleIcon from '@mui/icons-material/Title';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Button } from "@mui/material";
import Head from "../../Head";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToSelectedColumns,removeFromSelectedColumns } from "../../../redux/slices/createSpace";

const AddColumns = () => {
  const {color,selectedColumns} = useSelector((state)=>state.createSpace)
  
  const [columns,setColumns] = useState([
    {name:'name', icon:<TitleIcon />},
    {name:'priority', icon:<PriorityHighIcon />},
    {name:'assigner', icon:<SupervisorAccountOutlinedIcon />},
    {name:'assignee', icon:<PersonOutlinedIcon />},
    {name:'status', icon:<DonutLargeOutlinedIcon />},
    {name:'dueDate', icon:<CalendarTodayOutlinedIcon />},
    {name:'timer', icon:<TimerOutlinedIcon />},
]) 
  const [dragging, setDragging] = React.useState(false);
  const [draggedColumn, setDraggedColumn] = React.useState(null);
  const dispatch = useDispatch()
  const handleDragStart = (event, column) => {
    setDraggedColumn(column)
    setDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (draggedColumn) {
      // Check if dropped in the second container
      if (!selectedColumns.includes(draggedColumn) && event.currentTarget.classList.contains("create-space-selected-columns")) {
        console.log(1)
        dispatch(addToSelectedColumns(draggedColumn));
        setColumns((prev=>prev.filter((c)=>c.name !== draggedColumn.name)))
      }
      else if (!columns.includes(draggedColumn) && event.currentTarget.classList.contains("create-space-columns")) {
        console.log(2)
        console.log(draggedColumn)
        setColumns((prev)=>[...prev, draggedColumn])
        dispatch(removeFromSelectedColumns(draggedColumn.name));
      }
      setDragging(false);
      setDraggedColumn(null);
    }
  };
  console.log(selectedColumns)
  return (
    <div className="w-[100%]">
      <h1 className="text-center mt-[30px] text-[1.3em] font-normal">Drag and drop columns.</h1>
    <div className="w-[90%] mx-auto justify-center mt-[30px] flex gap-[50px]">
      <Head title={`Create Space - Columns`} description="Create a new space" />
      <div
        className="w-[300px] relative py-[4em] flex flex-col min-h-[50px] p-[1em] items-center justify-center gap-[10px] boxshadow create-space-columns"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >
        <h1 className="absolute top-[10px]">Columns</h1>
        {
          columns?.map((column)=>{
            const {name, icon} = column
            return (
              <div
              draggable
              onDragStart={(e)=>handleDragStart(e,column)}
              style={{borderColor:color}}
              className={`cursor-move border-[1px] flex items-center justify-center gap-[30%] stroke-white stroke-[1px] text-[gray]   w-[90%]  h-[50px]  ${
                dragging ? "opacity-50" : ""
              }`}
              >
                <span className="w-[50px]">{name}</span>
              <span>{icon}</span>
              </div>
              )
            })
        }
      </div>
      {/* Selected Columns Container */}
      <div
        className="w-[300px] relative py-[4em] flex flex-col min-h-[50px] p-[1em] items-center justify-center gap-[10px] boxshadow create-space-selected-columns"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h1 className="absolute top-[10px]">Selected Columns</h1>
        {
          selectedColumns?.map((column)=>{
            const {name,icon} = column
            return (
              <div
              draggable
              onDragStart={(e)=>handleDragStart(e,column)}
              style={{borderColor:color}}
              className={`cursor-move border-[1px] flex items-center justify-center gap-[30%] stroke-white stroke-[1px] text-[gray]   w-[90%]  h-[50px]  ${
                dragging ? "opacity-50" : ""
              }`}
              >
                <span className="w-[50px]">{name}</span>
              <span>{icon}</span>
              </div>
              )
            })
        }
      </div>
    </div>
        </div>
  );
};

export default AddColumns;
