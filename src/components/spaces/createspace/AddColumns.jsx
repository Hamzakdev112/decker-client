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
import { useSelector } from "react-redux";

const AddColumns = () => {
  const {color} = useSelector((state)=>state.createSpace)
  const columns = [
    {name:'name', icon:<TitleIcon />},
    {name:'priority', icon:<PriorityHighIcon />},
    {name:'assigner', icon:<SupervisorAccountOutlinedIcon />},
    {name:'assignee', icon:<PersonOutlinedIcon />},
    {name:'status', icon:<DonutLargeOutlinedIcon />},
    {name:'dueDate', icon:<CalendarTodayOutlinedIcon />},
    {name:'timer', icon:<TimerOutlinedIcon />},
]
  const [dragging, setDragging] = React.useState(false);
  const [draggedElement, setDraggedElement] = React.useState(null);
  const [draggedColumn, setDraggedColumn] = React.useState(null);
  console.log(draggedColumn)
  const [selectedColumns, setSelectedColumns] = useState([])
  console.log(selectedColumns)
  const handleDragStart = (event, column) => {
    setDraggedColumn(column)
    setDragging(true);
    setDraggedElement(event.target);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (draggedElement) {
      // Check if dropped in the second container
      if (!selectedColumns.includes(draggedColumn) && event.currentTarget.classList.contains("create-space-selected-columns")) {
        setSelectedColumns((prev) => [...prev, draggedColumn]);
      }
      else if (event.currentTarget.classList.contains("create-space-columns")) {
        setSelectedColumns((prev) => prev.filter(p=> p != draggedColumn));
      }
      event.currentTarget.appendChild(draggedElement);
      setDragging(false);
      setDraggedElement(null);
      setDraggedColumn(null);
    }
  };

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
              onDragStart={(e)=>handleDragStart(e,name)}
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
      </div>
    </div>
        </div>
  );
};

export default AddColumns;
