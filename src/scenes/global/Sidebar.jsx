import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../../config/config";
import { getMe } from "../../apiCalls/userApis";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();


  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: '#494949',
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const {mySpaces} = useSelector(state=>state.spaces)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const handleLogout = async()=>{
    try{
      const {data} = await axios.get(`${SERVER_URL}/api/users/logout`, {
        withCredentials:true
      })
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Box
      sx={
        {
          height:'100%',
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: '#6e6e6e',
            }}
          >
            {!isCollapsed && (
              <div className="flex justify-center ">
                <h1 className="text-[1.5em]">MONSTER</h1>
                <button className="absolute right-[-1px] top-0 flex justify-center items-center w-[30px] h-[30px]"  onClick={() => setIsCollapsed(!isCollapsed)}>
                  <CancelOutlinedIcon  />
                </button>
              </div>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`.`}
                  style={{ cursor: "pointer" }}
                /> */}
              </Box>
              <Box textAlign="center">
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Spaces
            </Typography>
            <Item
              title="Create Space"
              to="/team"
              icon={<AddCircleOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {
              mySpaces?.map((space)=>(
                <Item
                title={space.name}
                to={`/space/${space._id}/list`}
                icon={<img src="/assets/images.png" />}
                selected={selected}
                setSelected={setSelected}
                />
                ))
              }

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Account
            </Typography>
            <Item
              title="Profile"
              to="/profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <button
            className="ml-[27px] text-[#4d4d4d] flex gap-3"
            onClick={handleLogout}
            > <LogoutIcon />LOGOUT</button>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
