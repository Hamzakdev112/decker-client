import * as React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import Checkbox from "@mui/material/Checkbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LoopIcon from "@mui/icons-material/Loop";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import TimelapseIcon from "@mui/icons-material/Timelapse";
const AddColumns = ({setColumns}) => {
  return (
    <div className="relative mx-auto w-[70vw] border-[1px] border-[#f1f1f1] flex flex-col p-[20px] h-[100%]">
      <div className="flex flex-col gap-5 items-center">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <FlagIcon />
            <p>Priority</p>
            <Checkbox defaultChecked />
          </div>
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <FlagIcon />
            <p>Assignee</p>
            <Checkbox defaultChecked />
          </div>
        </div>
        <div className="flex gap-4 items-center ">
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <LoopIcon />
            <p>Staus</p>
            <Checkbox defaultChecked />
          </div>
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <CalendarTodayIcon />
            <p>Due Date</p>
            <Checkbox defaultChecked />
          </div>
        </div>

        <div className="flex gap-4 items-center ">
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <TimelapseIcon />
            <p>Timer</p>
            <Checkbox />
          </div>
          <div className="flex items-center gap-2 border-[1px] border-[rgb(0,0,0)] w-[150px] p-1 h-[55px]">
            <AccessibilityNewIcon />
            <p>Name</p>
            <Checkbox defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddColumns;
