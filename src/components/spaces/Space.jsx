import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksBySpaceId } from "../../apiCalls/tasksApis";
import { getSpaceById } from "../../apiCalls/spacesApis";
import Topbar from "../../scenes/global/Topbar";
import { Dialog, DialogContent } from '@material-ui/core';
import AddTask from "../AddTask";
import { useState } from "react";
import { useRef } from "react";
import { setAddColumnOpen } from "../../redux/slices/spaceSlice";
import AddColumn from "./list/AddColumn";

const Space = () => {
  const location = useLocation()
  const spaceId = location.pathname.split('/')[2]
  const [addTaskDialog,setAddTaskDialog] = useState(false)
  const {addColumnOpen} = useSelector(state=>state.spaces)
  const dispatch = useDispatch()
  const taskDialogRef = useRef()
  const addColumnRef = useRef()
  useEffect(()=>{
    getTasksBySpaceId(dispatch, spaceId)
    getSpaceById(dispatch, spaceId)
    function handleClickOutside(event) {
      if (taskDialogRef.current && !taskDialogRef.current.contains(event.target)) {
        setAddTaskDialog(false)
      }
      if (addColumnRef.current && !addColumnRef.current.contains(event.target)) {
        dispatch(setAddColumnOpen(false)) 
       }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[spaceId, dispatch, taskDialogRef, addColumnRef])
  return (

    <>
    <Topbar />
    <div 
    className="mt-[2em] relative mx-auto w-[96%] border-[1px] border-[#f1f1f1] flex flex-col p-[20px] h-[100%]"
    >

      <h1
       className="mb-[1.5em] text-[1.2em]">Tasks</h1>
       {
        addColumnOpen &&
         <div
         ref={addColumnRef}
          className="bg-[white] z-[2] boxshadow w-[230px] top-0 right-0 absolute h-[700px]">
          <AddColumn
           />
      </div>
      }
      <div
      className="w-[100%] mx-auto text-sm h-[70vh]"
      >
        <Outlet/>
        <button onClick={()=>setAddTaskDialog(true)} className="fixed right-[30px] bottom-[30px] bg-[red] text-white p-[10px]">+  TASK</button>
        <Dialog

        open={addTaskDialog}
        >
          <DialogContent
          className="overflow-x-hidden"
          ref={taskDialogRef}>
            <AddTask setAddTaskDialog={setAddTaskDialog} spaceId={spaceId} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
</>
  );
};

export default Space;
