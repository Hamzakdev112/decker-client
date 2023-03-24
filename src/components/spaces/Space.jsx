import { useState,useEffect,useRef } from "react";
import { Dialog, DialogContent } from '@material-ui/core';
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTasksBySpaceId } from "../../apiCalls/tasksApis";
import { getSpaceById } from "../../apiCalls/spacesApis";
import { handleClickOutSide } from "../../services/functions";
import { setAddColumnOpen } from "../../redux/slices/spaceSlice";
import AddTask from "../AddTask/AddTask";
import AddColumn from "../spaces/list/AddColumn";
import Topbar from "../navigations/Topbar";
import CancelIcon from '@mui/icons-material/Cancel';

const Space = () => {
  const location = useLocation()
  const spaceId = location.pathname.split('/')[2]
  const [addTaskDialog,setAddTaskDialog] = useState(false)
  const {addColumnOpen} = useSelector(state=>state.spaces)
  const dispatch = useDispatch()
  const addColumnRef = useRef()
  useEffect(()=>{
    getTasksBySpaceId(dispatch, spaceId)
    getSpaceById(dispatch, spaceId)
    handleClickOutSide(addColumnRef, ()=>dispatch(setAddColumnOpen(false)))
  },[spaceId, dispatch, addColumnRef])
  return (
    <>
    <Topbar />
    <div 
    className="mt-[2em] relative mx-auto w-[96%] border-[1px] border-[#f1f1f1] flex flex-col p-[20px] h-[100%]"
    >
       {
        addColumnOpen &&
         <div
         ref={addColumnRef}
          className="rounded-[7px] bg-[white] z-[2] boxshadow w-[230px] top-0 right-0 absolute h-[700px]">
          <AddColumn spaceId={spaceId}
           />
      </div>
      }
      <div
      className="w-[100%] mx-auto text-sm h-[70vh]"
      >
        <Outlet/>
        {/* Add Task Dialog */}
        <button onClick={()=>setAddTaskDialog(true)} className="fixed right-[30px] bottom-[30px] bg-[red] text-white p-[10px]">+  TASK</button>
        <Dialog
        className="relative"
        open={addTaskDialog}
        >
      <button onClick={()=>setAddTaskDialog(false)} className='absolute text-[red] hover:text-[#e04646] top-0 right-0 z-10'><CancelIcon /></button>
          <DialogContent
          className="overflow-x-hidden"
          >
            <AddTask setAddTaskDialog={setAddTaskDialog} spaceId={spaceId} />
          </DialogContent>
        </Dialog>

        {/* -------------------------------------------------------------------------------- */}


      </div>
          {/* <div className="absolute">
          <SingleTaskDialog />
          </div> */}
    </div>
</>
  );
};

export default Space;
