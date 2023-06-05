import { Tooltip } from "@mui/material";
import { useState } from "react";
import EditName from "../EditName";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, getTasksBySpaceId } from "../../../../apiCalls/tasksApis";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader  } from "react-spinners";




const handleEditName = (id, setEditName, setRowId) => {
  setEditName(true);
  setRowId(id);
};


const NameCell = ({params, rowId, setRowId})=>{
  const {singleSpace} = useSelector(state=>state.spaces)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const handleDeleteTask =async (id) => {
    setDeleteLoading(true)
    await deleteTask(id);
    setDeleteLoading(false)
    getTasksBySpaceId(dispatch, singleSpace._id)
  };
const dispatch = useDispatch()
    const [editName, setEditName] = useState(false);
    const value = params.value;
        return (
          <div className="w-[100%]">
        {
          editName && params.row._id === rowId ?
          <EditName taskId={params.row._id} setEditName={setEditName} value={value} />
          :
          <div className="flex items-center name-container gap-1">
          <h1 className="mr-[10px]">{value}</h1>
          <Tooltip title="Rename">
          <button
          onClick={()=>handleEditName(params.row._id,setEditName,setRowId)}
          className="hover:text-[blue] name-edit hidden">
            <EditIcon sx={{fontSize:'15px'}} />
            </button>
            </Tooltip>
          <Tooltip title="Delete">
            {
              deleteLoading ? 
            <ClipLoader size="12px" />
            :
              <button
              onClick={()=>handleDeleteTask(params.row._id)}
              className="hover:text-[red] text-[#c21717] name-edit hidden">
            <DeleteIcon sx={{fontSize:'15px'}} />
            </button>
          }
            </Tooltip>
          </div>
          
        } 
          </div>
          )
  }

  export default NameCell