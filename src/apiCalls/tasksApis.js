import axios from "axios"
import { toast } from "react-toastify"
import { SERVER_URL } from "../config/config"
import { getTasksBySpaceIdFailure, getTasksBySpaceIdStart, getTasksBySpaceIdSuccess } from "../redux/slices/taskSlice"



export const getTasksBySpaceId = async(dispatch, spaceId, search)=>{
    try{
        dispatch(getTasksBySpaceIdStart())
        let data;
        if(search){
         data = await axios.get(`${SERVER_URL}/api/workspace/tasks/all/${spaceId}?search=${search}`, {withCredentials:true})
        }
        else{
         data = await axios.get(`${SERVER_URL}/api/workspace/tasks/all/${spaceId}`, {withCredentials:true})
        }
            dispatch(getTasksBySpaceIdSuccess(data?.data.tasks))
    }catch(err){
        console.log(err)
        err.response.data.message ? 
        dispatch(getTasksBySpaceIdFailure(err.response.data.message))
        :
        dispatch(getTasksBySpaceIdFailure(err.message))

    }
}
export const updateTaskName = async(taskId, newName)=>{
       const {data} =  await axios.put(
            `${SERVER_URL}/api/workspace/tasks/update/name/${taskId}`,
            {name: newName},
            {withCredentials:true}
            )
            toast.info(
                <div>
              <span className="text-[0.9em] text-[#575757]">NAME: </span>
                <span className="bg-[#e6e6e6] text-[#575757] rounded-[4px] text-[0.8em] p-1">{data.name}</span>
                </div>
              ,{
                autoClose:2000,
                 type:'pending',
        })
}
export const deleteTask = async(taskId)=>{
       const {data} =  await axios.delete(
            `${SERVER_URL}/api/workspace/tasks/delete/${taskId}`,
            {withCredentials:true}
            )
            toast.info(
                <div>
              <span className="text-[0.9em] text-[#575757]">DELETED: </span>
                <span className="bg-[#e6e6e6] text-[#575757] rounded-[4px] text-[0.8em] p-1">{taskId}</span>
                </div>
              ,{
                autoClose:2000,
                 type:'pending',
        })
}