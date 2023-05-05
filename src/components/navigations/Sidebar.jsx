import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../../config/config";
import { BarLoader } from "react-spinners";
import Loader from "../loading/Loader";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: 'white',
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({isSidebarCollapsed,setIsSidebarCollapsed}) => {
  const {mySpaces, isFetching} = useSelector(state=>state.spaces)
  const [selected, setSelected] = useState("Dashboard");
  const handleLogout = async()=>{
    try{
       await axios.get(`${SERVER_URL}/api/users/logout`, {
        withCredentials:true
      })
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className={`overflow-hidden no-scrollbar hover:overflow-y-scroll  h-[100vh] ${isSidebarCollapsed ? "w-[50px]" : "w-[250px]"}  border-[#cccccc] border-r-[1px] fixed top[100px]`}
    >
      {
        !isSidebarCollapsed &&
        <button onClick={()=>setIsSidebarCollapsed(true)} className="absolute right-0 top-0"><CancelOutlinedIcon sx={{stroke:'white', strokeWidth:'1px'}} /></button>
      }
        {
        !isSidebarCollapsed ?
      <div className="flex items-center  border-b-[1px] border-[#e5e7eb] ">
        <img className="w-[80px] ml-[20px] aspect-square" src="/assets/logo.png" alt="" />
        <h1 className="text-[1.7em] logo">DECKER</h1>
      </div>
      :
      <div className="flex items-center justify-center mt-[20px]">
        <button onClick={()=>setIsSidebarCollapsed(false)}><MenuOutlinedIcon /></button>
      </div>
      }
      <div className={`w-[80%] mt-[20px] ${isSidebarCollapsed && "items-center"} flex flex-col gap-[20px] mx-auto`}>
    <div>
      {
        !isSidebarCollapsed && 
        <h1 className="text-[1.1em]">Spaces</h1>
      }
       <NavLink
       to='/createspace'
            className="flex gap-[12px] ml-[px]  mt-[7px] items-center"
            >
              <div  className="w-[35px]">
              <AddCircleOutlineOutlinedIcon  />
              </div>
             {!isSidebarCollapsed && <span>New</span>}
              </NavLink>
      {
        mySpaces && mySpaces.map((space)=>{
          return (
            <NavLink
            key={space._id}
            className={`flex gap-[12px] mt-[7px] items-center ${isFetching && "pointer-events-none"}`}
            to={`/space/${space._id}/list`}
            >
              <img className="w-[35px]" src="/assets/images.png" alt="" />
             {!isSidebarCollapsed && <span>{space.name}</span>}
              </NavLink>
          )
        })
      }
      
    </div>

    <div>
    {
        !isSidebarCollapsed && 
        <h1 className="text-[1.1em]">Account</h1>
      }
            <NavLink className="flex gap-[12px] mt-[7px] items-center" to='/profile'><PersonOutlinedIcon  />{!isSidebarCollapsed && <span>Profile</span>}</NavLink>
            < button className="flex gap-[12px] mt-[7px] items-center" onClick={handleLogout}><LogoutIcon  />{!isSidebarCollapsed && <span>Logout</span>}</button>
    </div>


      </div>
    </div>
  );
};

export default Sidebar;
