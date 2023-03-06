import React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import axios from "axios";
import { SERVER_URL } from "../../../config/config";

const PriorityModal = ({ taskId, setOpenStatus }) => {
  const handleSubmit = async (value) => {
    try {
      await axios.put(
        `${SERVER_URL}/api/workspace/tasks/update/${taskId}`,
        {
          priority: value,
        },
        {
          withCredentials: true,
        }
      );
      setOpenStatus(false);
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
        onClick={() => handleSubmit("URGENT")}
      >
        <FlagIcon sx={{ color: "red" }} />
        <p>URGENT</p>
      </div>
      <div
        className="flex items-center gap-3 mb-2 hover:cursor-pointer"
        onClick={() => handleSubmit("HIGH")}
      >
        <FlagIcon sx={{ color: "yellow" }} />
        <p>HIGH</p>
      </div>
      <div
        className="flex items-center gap-3 mb-2 hover:cursor-pointer"
        onClick={() => handleSubmit("NORMAL")}
      >
        <FlagIcon sx={{ color: "#00ade2" }} />
        <p>NORMAL</p>
      </div>
      <div
        className="flex items-center gap-3 mb-2 hover:cursor-pointer"
        onClick={() => handleSubmit("LOW")}
      >
        <FlagIcon sx={{ color: "grey" }} />
        <p>LOW</p>
      </div>
    </div>
  );
};

export default PriorityModal;
