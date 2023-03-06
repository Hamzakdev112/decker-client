import axios from "axios"
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

