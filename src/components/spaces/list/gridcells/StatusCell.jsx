  import { useCallback, useEffect } from "react";
  import { useRef } from "react";
  import { useState } from "react";
  import { handleClickOutSide } from "../../../../services/functions";
  import StatusBar from "../Status";
  import {motion} from 'framer-motion'
 
  const StatusCell = ({params, rowId, setRowId})=>{
      const statusRef = useRef()
    const [openStatus, setOpenStatus] = useState(false);
      useEffect(()=>{
      handleClickOutSide(statusRef, ()=>setOpenStatus(false))
      },[]) 
      const handleStatusOpen = useCallback((id,setOpenStatus,setRowId)=>{
        setOpenStatus(prev=>!prev)
        setRowId(id)
      },[rowId])
    
      const { value } = params;
                  return (
                    <div className="">
                      <span onClick={()=>handleStatusOpen(params.row._id,setOpenStatus,setRowId)}
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
                      <motion.div
                      ref={statusRef}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }} >
                      <StatusBar taskId={params.row._id} currentValue={value} setOpenStatus={setOpenStatus} />
                      </motion.div>}
                    </div>
                    );
    
    }
    
    export default StatusCell