import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from "moment";
import { setAddColumnOpen } from "../../../redux/slices/spaceSlice";
import StatusBar from "./Status";
import PriorityModal from "./Priority";
import FlagIcon from "@mui/icons-material/Flag";
import EditName from "./EditName";
import { handleClickOutSide } from "../../../services/functions";
import Timer from "./Timer";
import Tooltip from '@mui/material/Tooltip';


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

const NameCell = (params)=>{
  const value = params.value;
      return (
        editName && params.row._id === rowId ?
        <EditName taskId={params.row._id} setEditName={setEditName} value={value} />
        :
        <h1 className="">{value}</h1>
        )
}

const StatusCell = (params)=>{
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
                );

}

const AssigneeCell = (params)=>{
  return <img alt="test" src={"/assets/user.png"} className="w-[30px] h-[30px]" />;
}

const DueDateCell = (params)=>{
  const { value } = params;
          const overDue = new Date(value) > new Date(Date.now());
          const date = moment(value)
          const formattedDate = date.fromNow()
          return (
            <span className={overDue ? `text-[#6870fa]` : `text-[red]`}>
              {value && formattedDate}
            </span>
          );
}

const PriorityCell = (params)=>{
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
        <Tooltip title={value} placement="top">
        <FlagIcon />
        </Tooltip>
      </span>
      {openPriority &&
      params.row._id === rowId &&
      <div ref={priorityRef}>
       <PriorityModal ref={priorityRef} taskId={params.row._id} currentValue={value} setOpenPriority={setOpenPriority} />
      </div>
       }
    </div>
  );

}
const TimerCell = (params)=>{
  return (
    <div>
      <Timer spaceId={singleSpace._id} id={params.row._id} />
    </div>

  );

}

  const columnCellMap = {
    name: NameCell,
    status: StatusCell,
    assignee: AssigneeCell,
    dueDate: DueDateCell,
    priority: PriorityCell,
    timer:TimerCell,
  };

  const columns = singleSpace?.columns?.map((column)=>({
    field:column,
    headerName:column && column[0]?.toUpperCase() + column?.slice(1),
    renderCell:columnCellMap[column],
    width:column === "name" ? 400 : 120,
    sortable:false,
  }))

columns?.unshift({field:'add', headerName:'add', sortable: false, renderHeader: () => {
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
},},)

  return (
    <div className="w-[100%] h-[100%]">
        <h1
       className="mb-[1.5em] text-[1.2em]">Tasks</h1>
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
