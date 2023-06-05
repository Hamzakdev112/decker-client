import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { SERVER_URL } from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../../redux/slices/taskSlice";
import { toast } from "react-toastify";
const StatusBar = ({ taskId,setOpenStatus,currentValue }) => {
  const { singleSpace} = useSelector((state) => state.spaces);
  const {statuses} = singleSpace
  const dispatch = useDispatch()
  const handleSubmit = async (value) => {
    setOpenStatus(false)
    dispatch(updateStatus({id:taskId, status:value}))
    try {
        const {data} = await axios.put(`
      ${SERVER_URL}/api/workspace/tasks/update/status/${taskId}`,
       {status: value,},
      {withCredentials:true})
      toast.info(
        <div>
      <span className="text-[0.9em] text-[#575757]">STATUS: </span>
        <span className="bg-[#e6e6e6] text-[#575757] rounded-[4px] text-[0.8em] p-1">{data.status}</span>
        </div>
      ,{
        autoClose:2000,
         type:'pending',
})
    } catch (error) {
      toast.error('Error Occured')
    }
  };

  return (
    <div
      // ref={ref}
      className={`absolute mt-[10px] boxshadow p-3 items-start overflow-auto w-[auto] min-h-[100px] whitespace-nowrap  rounded-[5px]   flex-col z-10 bg-white gap-10`}
    >
      {
        statuses?.map((status)=>{
          return (
            <div
            key={status.title}
            className={`${currentValue === status.title? '!text-[black]': '!text-[#c2c2c2]'} flex hover:!text-[white]   hover:bg-[${status.color}]  transition-all duration-[0.3s] p-2 rounded-[5px] items-center gap-3 mb-2 hover:cursor-pointer`}
            onClick={() => handleSubmit(status.title)}
            >
        <CircleIcon sx={{ color: status.color }} />
        <p>{status.title}</p>
      </div>
        )
      })
    }
    </div>
  );
};

export default StatusBar;
