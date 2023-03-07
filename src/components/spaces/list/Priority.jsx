import React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import axios from "axios";
import { SERVER_URL } from "../../../config/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updatePriority } from "../../../redux/slices/taskSlice";



const PriorityModal = ({ taskId, setOpenPriority, currentValue }) => {
  const dispatch = useDispatch()
  const handleSubmit = async (value) => {
    try {
      setOpenPriority(false);
      dispatch(updatePriority({id:taskId, priority:value}))
      const {data} = await toast.promise(
        axios.put(
        `${SERVER_URL}/api/workspace/tasks/update/priority/${taskId}`,
        {priority: value},
        {withCredentials: true}),
        {
          pending: 'Updating',
          success: 'Priority Changed',
          error: 'Error Occured'
        },
        {autoClose:2000}

      ) 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      // ref={ref}
      className={`absolute mt-[10px] boxshadow p-3 items-start overflow-auto w-[auto] min-h-[100px] whitespace-nowrap  rounded-[5px]   flex-col z-10 bg-white gap-10`}
    >
      <div
        className={`${currentValue === "Urgent" ? '!text-[black]': '!text-[#c2c2c2]'} flex hover:!text-[white]   hover:bg-[red]  transition-all duration-[0.3s] p-2 rounded-[5px] items-center gap-3 mb-2 hover:cursor-pointer`}
        onClick={() => handleSubmit("Urgent")}
      >
        <FlagIcon sx={{ color: "red" }} />
        <p>Urgent</p>
      </div>
      <div
        className={`flex ${currentValue === "High" ? '!text-[black]' : '!text-[#c2c2c2]'}   hover:!text-[white]   hover:bg-[#00ade2] transition-all duration-[0.3s]  p-2 rounded-[5px] items-center gap-3 mb-2 hover:cursor-pointer`}
        onClick={() => handleSubmit("High")}
      >
        <FlagIcon sx={{ color: "#00ade2" }} />
        <p>High</p>
      </div>
      <div
        className={`flex ${currentValue === "Normal" ? '!text-[black]' : '!text-[#c2c2c2]'} hover:!text-[white]   hover:bg-[green] transition-all duration-[0.3s]  p-2 rounded-[5px] items-center gap-3 mb-2 hover:cursor-pointer`}
        onClick={() => handleSubmit("Normal")}
      >
        <FlagIcon sx={{ color: "green" }} />
        <p>Normal</p>
      </div>
    </div>
  );
};

export default PriorityModal;
