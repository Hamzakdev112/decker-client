import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { SERVER_URL } from "../../../config/config";
const StatusBar = ({ taskId,setOpenStatus }) => {
  // const [isOpen, setisOpen] = useState(false);
  // const handleOpen = (e) => {
  //   e.preventDefault();
  //   setisOpen((prev) => !prev);
  // };
  // const ref = useDetectClickOutside({ onTriggered: () => setisOpen(false) });
  const handleSubmit = async (value) => {
    try {
      await axios.put(`${SERVER_URL}/api/workspace/tasks/update/${taskId}`, {
        status: value,
      },{
        withCredentials:true
      }); 
      setOpenStatus(false)
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      // ref={ref}
      className="absolute items-start overflow-auto w-[200px] h-[200px] whitespace-nowrap min-h-[10px ] rounded-[5px]   flex-col z-10 bg-white gap-10"
    >
      <div
        className="flex items-center gap-3 mb-2 hover:cursor-pointer"
        onClick={() => handleSubmit("IN PROGRESS")}
      >
        <CircleIcon sx={{ color: "red" }} />
        <p>IN PROGRESS</p>
      </div>
      <div
        className="flex items-center gap-3 mb-2 hover:cursor-pointer"
        onClick={() => handleSubmit("FREEZE")}
      >
        <CircleIcon sx={{ color: "#00ade2" }} />
        <p>FREEZE</p>
      </div>
      <div
        className="flex items-center gap-3 mb-2 hover:cursor-pointer"
        onClick={() => handleSubmit("COMPLETED")}
      >
        <CircleIcon sx={{ color: "green" }} />
        <p>COMPLETED</p>
      </div>
    </div>
  );
};

export default StatusBar;
