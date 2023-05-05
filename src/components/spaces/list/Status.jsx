import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { SERVER_URL } from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../../redux/slices/taskSlice";
import { toast } from "react-toastify";
const StatusBar = ({ taskId,setOpenStatus,currentValue }) => {
  const { singleSpace} = useSelector((state) => state.spaces);
  const statuses = singleSpace?.statuses
  const dispatch = useDispatch()
  const handleSubmit = async (value) => {
    setOpenStatus(false)
    dispatch(updateStatus({id:taskId, status:value}))
    try {
      const {data} = await toast.promise(
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
