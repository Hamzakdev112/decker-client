import axios from "axios"
import { toast } from "react-toastify"
import { SERVER_URL } from "../config/config"
import { getTasksBySpaceIdFailure, getTasksBySpaceIdStart, getTasksBySpaceIdSuccess } from "../redux/slices/taskSlice"



export const getTasksBySpaceId = async(dispatch, spaceId)=>{
    try{
        dispatch(getTasksBySpaceIdStart())
    const {data} = await axios.get(`${SERVER_URL}/api/workspace/tasks/all/${spaceId}`, {withCredentials:true})
        dispatch(getTasksBySpaceIdSuccess(data.tasks))
    }catch(err){
        dispatch(getTasksBySpaceIdFailure(err))
    }
}
export const updateTaskName = async(taskId, newName)=>{
    const {data} = await toast.promise(
        axios.put(
            `${SERVER_URL}/api/workspace/tasks/update/name/${taskId}`,
            {name: newName},
            {withCredentials:true}
            ),
            {
                pending: 'Updating',
                success: 'Name Changed',
                error: 'Error Occured'
            },
            {autoClose:2000}
            )
}