import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { SERVER_URL } from "../../../config/config";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../../redux/slices/taskSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRef } from "react";
const StatusFilter = ({ taskId,setOpenStatus }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const filterRef = useRef()
  const handleSubmit = async (value) => {
    setOpenStatus(false)
    dispatch(updateStatus({id:taskId, status:value}))
    try {
        await toast.promise(
        axios.put(`
      ${SERVER_URL}/api/workspace/tasks/update/status/${taskId}`,
       {status: value,},
      {withCredentials:true}),
        {
          pending: 'Updating',
          success: 'Status Changed',
          error: 'Error Occured'
        },
        {autoClose:2000}
    );
    } catch (error) {
      toast.error('Error Occured')
    }
  };

  return (
    <div className="w-[40%]">
        <div>
            <h1>Filter By Status</h1>
        <div
        className={`flex hover:!text-[white]   hover:bg-[gray]  transition-all duration-[0.3s] p-1 rounded-[5px] items-center gap-3  hover:cursor-pointer`}
        onClick={() => setOpen(prev=>!prev)}
        >
        <CircleIcon sx={{ color: "gray" }} />   
        <p  className="text-[0.8em]">ALL</p>
      </div>
        </div>
        {
            open &&
            <div
            ref={filterRef}
            className={`absolute mt-[10px] boxshadow items-start overflow-auto w-[auto] min-h-[100px] whitespace-nowrap  rounded-[5px]   flex-col z-10 bg-white`}
      >
      <div
        className={`flex hover:!text-[white]   hover:bg-[gray]  transition-all duration-[0.3s] p-1 rounded-[5px] items-center gap-3  hover:cursor-pointer`}
        onClick={() => handleSubmit("IN PROGRESS")}
        >
        <CircleIcon sx={{ color: "gray" }} />   
        <p  className="text-[0.8em]">ALL</p>
      </div>
      <div
        className={`flex hover:!text-[white]   hover:bg-[red]  transition-all duration-[0.3s] p-1 rounded-[5px] items-center gap-3  hover:cursor-pointer`}
        onClick={() => handleSubmit("IN PROGRESS")}
        >
        <CircleIcon sx={{ color: "red" }} />
        <p  className="text-[0.8em]">IN PROGRESS</p>
      </div>
      <div
        className={`flex hover:!text-[white]   hover:bg-[#00ade2] transition-all duration-[0.3s]  p-1 rounded-[5px] items-center gap-3  hover:cursor-pointer`}
        onClick={() => handleSubmit("FREEZE")}
      >
        <CircleIcon sx={{ color: "#00ade2" }} />
        <p className="text-[0.8em]">FREEZE</p>
      </div>
      <div
        className={`flex hover:!text-[white]   hover:bg-[green] transition-all duration-[0.3s]  p-1 rounded-[5px] items-center gap-3  hover:cursor-pointer`}
        onClick={() => handleSubmit("COMPLETED")}
        >
        <CircleIcon sx={{ color: "green" }} />
        <p className="text-[0.8em]">COMPLETED</p>
      </div>
          </div>
}
    </div>
  );
};

export default StatusFilter;
