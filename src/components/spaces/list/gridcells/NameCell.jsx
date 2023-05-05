import { Tooltip } from "@mui/material";
import { useState } from "react";
import EditName from "../EditName";
import EditIcon from '@mui/icons-material/Edit';

const handleEditName = (id, setEditName, setRowId) => {
  setEditName(true);
  setRowId(id);
};

const NameCell = ({params, rowId, setRowId})=>{
    const [editName, setEditName] = useState(false);
    const value = params.value;
        return (
          <div className="w-[100%]">
        {
          editName && params.row._id === rowId ?
          <EditName taskId={params.row._id} setEditName={setEditName} value={value} />
          :
          <div className="flex items-center name-container gap-4">
          <h1 className="">{value}</h1>
          <Tooltip title="Rename">
          <button
          onClick={()=>handleEditName(params.row._id,setEditName,setRowId)}
          className="hover:text-[blue] name-edit hidden">
            <EditIcon sx={{fontSize:'15px'}} />
            </button>
            </Tooltip>
          </div>
          
        } 
          </div>
          )
  }

  export default NameCell