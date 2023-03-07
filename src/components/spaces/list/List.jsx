import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from 'moment';
import { setAddColumnOpen } from "../../../redux/slices/spaceSlice";
import StatusBar from "./Status";
import PriorityModal from "./Priority";
const List = () => {
  const { tasksBySpaceId } = useSelector((state) => state.tasks);
  const { singleSpace } = useSelector((state) => state.spaces);
  const [openStatus, setOpenStatus] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [rowId, setRowId] = useState(null); 
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
  const updatedColumns = [];
  singleSpace?.columns.map((column) => {
    if (column.field === "name") {
      return updatedColumns.push({
        ...column,
        renderCell: (params) => {
          const value = params.value;
          return <h1 className="">{value}</h1>;
        },
      });
    } else if (column.field === "assignee") {
      return updatedColumns.push({
        ...column,
        renderCell: (params) => {
          return <img alt="test" src={"/assets/user.png"} className="w-[30px] h-[30px]" />;
        },
      });
    } else if (column.field === "dueDate") {
      return updatedColumns.push({
        ...column,
        renderCell: (params) => {
          const { value } = params;
          const overDue = new Date(value) > new Date(Date.now());
          const date = moment(value)
          const formattedDate = date.format('MMMM Do YYYY');
          return (
            <span className={overDue ? `text-[#6870fa]` : `text-[red]`}>
              {value && formattedDate}
            </span>
          );
        },
      });
    } 
    else if (column.field === "status") {
      return updatedColumns.push({
        ...column,
        renderCell: (params) => {
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
               <StatusBar taskId={params.row._id} currentValue={value} setOpenStatus={setOpenStatus} />
               }
            </div>
          );
        },
      });
    }
    else if (column.field === "priority") {
      return updatedColumns.push({
        ...column,
        renderCell: (params) => {
          const { value } = params;
          return (
            <div className="">
              <span onClick={()=>handlePriorityOpen(params.row._id)}
                className={`
            p-[10px] rounded-[5px] w-[100px] flex justify-center !text-[white]
            ${value === "Urgent" && "bg-[red]"} 
            ${value === "High" && "bg-[#00ade2]"} 
            ${value === "Normal" && "bg-[green]"} 
            `}
              >
                {value}
              </span>
              {openPriority &&
              params.row._id === rowId &&
               <PriorityModal taskId={params.row._id} setOpenPriority={setOpenPriority} />
               }
            </div>
          );
        },
      });
    }
    return updatedColumns.push({ ...column });
  });
  updatedColumns.push({
    field: "add",
    headerName: "add",
    sortable: false,
    renderHeader: () => {
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
    },
  });
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
          showCellRightBorder
          showColumnRightBorder
          getRowId={(row) => row?._id}
          columns={updatedColumns}
          disableColumnMenu
          disableSelectionOnClick
        />
      )}
    </div>
  );
};

export default List;
