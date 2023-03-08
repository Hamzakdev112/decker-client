import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from 'moment';
import { setAddColumnOpen } from "../../../redux/slices/spaceSlice";
import StatusBar from "./Status";
import PriorityModal from "./Priority";
import FlagIcon from "@mui/icons-material/Flag";
import EditName from "./EditName";
import { TextField } from "@mui/material";
import { handleClickOutSide } from "../../../services/functions";

const List = () => {
  const { tasksBySpaceId } = useSelector((state) => state.tasks);
  const { singleSpace } = useSelector((state) => state.spaces);
  const [editName, setEditName] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [rowId, setRowId] = useState(null); 
  const priorityRef = useRef()
  const statusRef = useRef()
  useEffect(()=>{
    handleClickOutSide(priorityRef, ()=>setOpenPriority(false))
    handleClickOutSide(statusRef, ()=>setOpenStatus(false))

  }, [priorityRef, statusRef])

const handleEditName = (params)=>{
  setEditName(true)
  setRowId(params.row._id)
}
  const handleStatusOpen = (id)=>{
    setOpenStatus(prev=>!prev)
    setOpenPriority(false)
    setRowId(id)
  }
  const handlePriorityOpen = (id)=>{
    setOpenPriority(prev=>!prev)
    setOpenStatus(false)
    setRowId(id)
  }
  const dispatch = useDispatch();

const columns = [{field:'name',sortable:false,width:450, headerName:'Name', renderCell: (params) => {
    const value = params.value;
      return (
        editName && params.row._id === rowId ?
        <EditName taskId={params.row._id} setEditName={setEditName} value={value} />
        :
        <h1 className="">{value}</h1>
        )},},
        {field:'assignee',sortable:false,width:70, headerName:'Assignee',renderCell: (params) => {
          return <img alt="test" src={"/assets/user.png"} className="w-[30px] h-[30px]" />;
        }, },
        {field:'dueDate', sortable:false, headerName:'Due Date',renderCell: (params) => {
          const { value } = params;
          const overDue = new Date(value) > new Date(Date.now());
          const date = moment(value)
          const formattedDate = date.format('MMMM Do YYYY');
          return (
            <span className={overDue ? `text-[#6870fa]` : `text-[red]`}>
              {value && formattedDate}
            </span>
          );
        },},
            {field:'priority',sortable:false, headerName: 'Priority',renderCell: (params) => {
              const { value } = params;
              return (
                <div
                 className="">
                  
                  <span onClick={()=>handlePriorityOpen(params.row._id)}
                    className={`
                p-[10px] rounded-[5px] w-[100px] 
                ${value === "Urgent" && "!text-[red]"} 
                ${value === "High" && "!text-[#00ade2]"} 
                ${value === "Normal" && "!text-[green]"} 
                `}
                  >
                    <FlagIcon />
                  </span>
                  {openPriority &&
                  params.row._id === rowId &&
                  <div ref={priorityRef}>
                   <PriorityModal ref={priorityRef} taskId={params.row._id} currentValue={value} setOpenPriority={setOpenPriority} />
                  </div>
                   }
                </div>
              );
            }, },
            {field:'status',sortable:false,width:120, headerName:'status', renderCell: (params) => {
              const { value } = params;
              return (
                <div className="">
                  <span onClick={()=>handleStatusOpen(params.row._id)}
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
                  <div ref={statusRef}>
                   <StatusBar taskId={params.row._id} currentValue={value} setOpenStatus={setOpenStatus} />
                  </div>}
                </div>
                );},},
            {field:'add', headerName:'add', sortable: false, renderHeader: () => {
              return (
                <button
                  className=" hover:text-[#00ade2]  w-[20px] flex justify-center items-center p-2 h-[20px]"
                  onClick={() => dispatch(setAddColumnOpen(true))}
                >
                  <AddCircleOutlineIcon
                  sx={{fontSize:'15px'}}
                  fontSize="inherit" />
        
                </button>
              );
            },},
      ]

  return (
    <div className="w-[100%] h-[100%]">
      {tasksBySpaceId && singleSpace && (
        <DataGrid
          sx={{
            border: 0,
            fontSize: "0.8em",
          }}
          getRowClassName={(params) => "cursor-pointer hover:text-[#6870fa]"}
          className="border-[white] "
          rows={tasksBySpaceId}
          disableColumnFilter
          showColumnRightBorder
          getRowId={(row) => row?._id}
          columns={columns}
          disableColumnMenu
          disableSelectionOnClick
          checkboxSelection={false}
          hideFooterPagination
          onCellDoubleClick={handleEditName}
        />
      )}
    </div>
  );
};

export default List;
