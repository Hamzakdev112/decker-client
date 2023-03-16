import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { handleClickOutSide } from "../../../../services/functions";
import StatusBar from "../Status";

const StatusCell = ({params, rowId, setRowId})=>{
    const statusRef = useRef()
  const [openStatus, setOpenStatus] = useState(false);

    useEffect(()=>{
    handleClickOutSide(statusRef, ()=>setOpenStatus(false))
    },[statusRef])

    const handleStatusOpen = (id)=>{
        setOpenStatus(prev=>!prev)
        // setOpenPriority(false)
        setRowId(id)
      }
    const { value } = params;
                return (
                  <div className="">
                    <span onClick={()=>handleStatusOpen(params.row._id)}
                      className={`
                  p-[10px] rounded-[5px] w-[100px] flex justify-center !text-[white]
                  ${value === "IN PROGRESS" && "bg-[red]"}
                  ${value === "FREEZE" && "bg-[#00ade2]"}
                  ${value === "COMPLETED" && "bg-[green]"}
                  `}
                    >
                    {value}
                    </span>
                    {openStatus &&
                    params.row._id === rowId &&
                    <div ref={statusRef}>
                     <StatusBar taskId={params.row._id} currentValue={value} setOpenStatus={setOpenStatus} />
                    </div>}
                  </div>
                  );
  
  }
  
  export default StatusCell