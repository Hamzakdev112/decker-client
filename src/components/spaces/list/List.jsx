import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { setAddColumnOpen } from "../../../redux/slices/spaceSlice";
import SearchIcon from '@mui/icons-material/Search';
import Loader from "../../loading/Loader";
import Error from "./Error";
import TuneIcon from '@mui/icons-material/Tune';
import { getTasksBySpaceId } from "../../../apiCalls/tasksApis";
import Filters from "../filters/Filters";
import NameCell from "./gridcells/NameCell";
import StatusCell from "./gridcells/StatusCell";
import AssigneeCell from "./gridcells/AssigneeCell";
import DueDateCell from "./gridcells/DueDateCell";
import PriorityCell from "./gridcells/PriorityCell";
import TimerCell from "./gridcells/TimerCell";
import CreatedAtCell from "./gridcells/CreatedAtCell";
import UpdatedAtCell from "./gridcells/UpdatedCell";
import AssignerCell from "./gridcells/AssignerCell";
import Head from "../../Head";

const List = () => {
  const { tasksBySpaceId, isFetching:tasksLoading, error:tasksError } = useSelector((state) => state.tasks);
  const { singleSpace, isFetching:spaceLoading, error:spaceError } = useSelector((state) => state.spaces);
  const [openFilters, setOpenFilters] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const dispatch = useDispatch();
  
const handleSearch = ()=>{
  getTasksBySpaceId(dispatch,singleSpace?._id, searchInput)
}

  const columnCellMap = {
    name: (params)=><NameCell params={params} rowId={rowId} setRowId={setRowId} />,
    status: (params)=><StatusCell params={params} rowId={rowId} setRowId={setRowId} />,
    dueDate: (params)=><DueDateCell params={params} />,
    priority: (params)=><PriorityCell params={params} rowId={rowId} setRowId={setRowId} />,
    timer:(params)=><TimerCell params={params} />,
    createdAt:(params)=><CreatedAtCell params={params} />,
    updatedAt:(params)=><UpdatedAtCell params={params} />,
    assignee: (params)=><AssigneeCell params={params} />,
    assigner:(params)=><AssignerCell params={params} />
  };

  const columns = singleSpace?.columns?.map((column)=>({
    field:column,
    headerName:column && column[0]?.toUpperCase() + column?.slice(1),
    renderCell:columnCellMap[column],
    width:column === "name" ? 300 : column === "dueDate" ? 110 : 120,
    sortable:false,
  }))

columns?.push({field:'add', headerName:'add', sortable: false, renderHeader: () => {
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
    <>
      <Head title={`${singleSpace?.name} - List`} description={singleSpace?.description} />
    {
      spaceLoading || tasksLoading ? <Loader /> :
      tasksError || spaceError ? <Error  />:
    <div className="w-[100%] h-[100%]">
      <div className="flex items-center mb-[1em] gap-[20px]">
        <h1 className="text-[1.5em]">Tasks</h1>
        <form onSubmit={handleSearch} className="flex border-[1px] border-[#c5bdbd] w-[200px] items-center rounded-[5px] h-[30px]">
          <SearchIcon fontSize="small" />
          <input onChange={(e)=>setSearchInput(e.target.value)} placeholder="Search tasks" className="focus:outline-none text-[12px]  w-[100%]" type="text" />
          <button type="submit" className="hidden"></button>
        </form>
        <div  onClick={()=>setOpenFilters(prev=>!prev)} className="relative flex items-center gap-1 p-1 cursor-pointer rounded-[10px] hover:bg-[#d3d3d3]">
          <TuneIcon sx={{fontSize:'18px'}} />
          Filters
          
        </div>
        {
            openFilters && 
            <div  >
              <Filters setOpenFilters={setOpenFilters}    />
            </div>
          }
        </div>
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
          autoWidth
        />
      )}
    </div>
          }
          </>
  );
};


export default List;
