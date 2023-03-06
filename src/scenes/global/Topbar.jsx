import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Topbar = () => {
  const {singleSpace} = useSelector(state=>state.spaces)

  return (
    <div className="border-b-[1px] border-[#e0e0e0] p-4 flex w-[100%] h-[70px]" >
      <div  className="flex w-[100%] h-[100%] items-center justify-between">
    <div className="flex justify-center gap-2 items-center">
      <img src="/assets/images.png" className=" w-[60px]" alt="" />
      <span>{singleSpace?.name}</span>
    </div>
    <div className="flex gap-[20px]">
      <NavLink to={`/space/${singleSpace?._id}/list`}>List</NavLink>
      <NavLink to={`/space/${singleSpace?._id}/board`}>Board</NavLink>
    </div>
    <div>
        <button className="w-[50px]" >
          <NotificationsOutlinedIcon />
        </button>
        <button className="w-[50px]" >
          <SettingsOutlinedIcon />
        </button>
        <Link to="/account" className="w-[50px]" >
          <PersonOutlinedIcon />
        </Link>
            </div>
      </div>
    </div>
  );
};

export default Topbar;
