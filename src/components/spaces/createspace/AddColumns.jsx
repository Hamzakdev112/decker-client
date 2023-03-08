import * as React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import Checkbox from "@mui/material/Checkbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LoopIcon from "@mui/icons-material/Loop";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import TimelapseIcon from "@mui/icons-material/Timelapse";
const AddColumns = ({setColumns}) => {

  const handleChange = (field,e)=>{

    setColumns((prev)=>({
      ...prev,
      [field]: e.target.checked
    }))
    

  }
  return (
    <div className="relative mx-auto w-[70vw] border-[1px] border-[#f1f1f1] flex flex-col p-[20px] h-[100%]">
      <div className="flex flex-col gap-5 items-center">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <FlagIcon />
            <p>Priority</p>
            <Checkbox defaultChecked onChange={(e)=>handleChange('priority', e)} />
          </div>
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <FlagIcon />
            <p>Assignee</p>
            <Checkbox defaultChecked onChange={(e)=>handleChange('assignee', e)} />
          </div>
        </div>
        <div className="flex gap-4 items-center ">
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <LoopIcon />
            <p>Status</p>
            <Checkbox defaultChecked onChange={(e)=>handleChange('status', e)} />
          </div>
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <CalendarTodayIcon />
            <p>Due Date</p>
            <Checkbox defaultChecked onChange={(e)=>handleChange('dueDate', e)} />
          </div>
        </div>

        <div className="flex gap-4 items-center ">
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <TimelapseIcon />
            <p>Timer</p>
            <Checkbox onChange={(e)=>handleChange('timer', e)} />
          </div>
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <AccessibilityNewIcon />
            <p>Name</p>
            <Checkbox onChange={(e)=>handleChange('name', e)} defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddColumns;
