import axios from "axios"
import { SERVER_URL } from "../config/config"
import { getAllSpacesFailure, getAllSpacesStart, getAllSpacesSuccess, getSpaceByIdFailure, getSpaceByIdStart, getSpaceByIdSuccess } from "../redux/slices/spaceSlice"




export const getAllSpaces = async(dispatch)=>{
    try{
        dispatch(getAllSpacesStart())
        const {data} = await axios.get(`${SERVER_URL}/api/workspace/spaces/all`, {withCredentials:true} )
        dispatch(getAllSpacesSuccess(data.spaces))
        
        
    }catch(err){
        console.log(err)
        dispatch(getAllSpacesFailure(err))
    }
}

export const getSpaceById = async(dispatch, spaceId)=>{
    try{
        dispatch(getSpaceByIdStart())
        const {data} = await axios.get(`${SERVER_URL}/api/workspace/spaces/single/${spaceId}`, {withCredentials:true} )
        dispatch(getSpaceByIdSuccess(data.space))
        
        
    }catch(err){
        console.log(err)
        dispatch(getSpaceByIdFailure(err))
    }
}
export const getMembers = async(spaceId, setMembers)=>{
    try{
        const {data} = await axios.get(`${SERVER_URL}/api/workspace/spaces/members/${spaceId}`, {withCredentials:true} )
        setMembers(data.space.members)
        
    }catch(err){
    }
}