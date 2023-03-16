import axios from "axios"
import { toast } from "react-toastify"
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
        dispatch(getSpaceByIdFailure(err.message))
    }
}


export const createSpace = async(name, description,columns)=>{
    const {data} = await toast.promise(
        axios.post(
            `${SERVER_URL}/api/workspace/spaces/new`,
            {name,description,columns},
            {withCredentials:true}
            ),
            {
                pending: 'Creating a new space',
                success: 'Space Created',
                error: 'Error Occured'
            },
            {autoClose:2000}
            )
            return data

}
export const updateColumnsApi = async(column, spaceId)=>{
    try{
        const toastId = toast.info('Updating...', {autoClose:false, type:'pending'})
        const {data} = await  axios.put(
            `${SERVER_URL}/api/workspace/spaces/columns/update/${column}/${spaceId}`,
            {},
        {withCredentials:true}
        )
        toast.update(toastId, {
            render: data.message,
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
          });
        return data
            }catch(err){
                toast.error('ERROR OCCURED', {autoClose:2000})
            }   
        }


export const getMembers = async(spaceId, setMembers)=>{
    try{
        const {data} = await axios.get(`${SERVER_URL}/api/workspace/spaces/members/${spaceId}`, {withCredentials:true} )
        setMembers(data.space.members)
        
    }catch(err){
    }
}

export const sendInviteToMember = async(spaceId,userId,email,setInvited)=>{
    try{
        const {data} = await axios.put(`${SERVER_URL}/api/workspace/spaces/invite/${spaceId}/${userId}/${email}`,{}, {withCredentials:true} )
        console.log(data)
        setInvited(true)
    }catch(err){
    }
}
export const verifyInvite = async(spaceId,token)=>{
        return  axios.put(`${SERVER_URL}/api/workspace/spaces/verify/${spaceId}/${token}`,{}, {withCredentials:true} )
}