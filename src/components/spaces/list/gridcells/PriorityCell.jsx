import { Tooltip } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import { useState } from "react";
import { handleClickOutSide } from "../../../../services/functions";
import { useEffect } from "react";
import { useRef } from "react";
import PriorityModal from "../Priority";

const PriorityCell = ({params, rowId, setRowId})=>{
  const [openPriority, setOpenPriority] = useState(false);
  const priorityRef = useRef()
    const { value } = params;

    const handlePriorityOpen = (id)=>{
        setOpenPriority(prev=>!prev)
        // setOpenStatus(false)
        setRowId(id)
      }
      
    useEffect(()=>{
        handleClickOutSide(priorityRef, ()=>setOpenPriority(false))
      }, [priorityRef])
    return (
      <div
       className="">
  
        <span onClick={()=>handlePriorityOpen(params.row._id)}
          className={`
      p-[10px] rounded-[5px] w-[100px]
      ${value === "Urgent" && "!text-[red]"}
      ${value === "High" && "!text-[#00ade2]"}
      ${value === "Normal" && "!text-[green]"}
      `}
        >
          <Tooltip title={value} placement="top">
          <FlagIcon />
          </Tooltip>
        </span>
        {openPriority &&
        params.row._id === rowId &&
        <div ref={priorityRef}>
         <PriorityModal ref={priorityRef} taskId={params.row._id} currentValue={value} setOpenPriority={setOpenPriority} />
        </div>
         }
      </div>
    );
  
  }

  export default PriorityCell