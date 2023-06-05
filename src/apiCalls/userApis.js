import axios from "axios"
import { SERVER_URL } from "../config/config"
import { getMeFailure, getMeStart, getMeSuccess, loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "../redux/slices/userSlice"




export const login = async(dispatch, email, password, navigate)=>{
    try{
        dispatch(loginStart())
        const {data} = await axios.post(`${SERVER_URL}/api/users/login`, {
            email,
            password
        }, {withCredentials:true})
        dispatch(loginSuccess(data))
        getMe(dispatch)
    }catch(err){
        dispatch(loginFailure(err))
    }
}

export const register = async(data,setRegisterLoading, setRegisterError,setRegisterMessage)=>{
    try{
        setRegisterLoading(true)
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: data.password,

        }
        const {data:response} = await axios.post(`${SERVER_URL}/api/users/register`,payload, {withCredentials:true})
        setRegisterLoading(false)
        setRegisterError(null)
        setRegisterMessage(response.message)
        // getMe(dispatch)
    }catch(err){
        setRegisterMessage(null)
        setRegisterLoading(false)
        setRegisterError(err.response.data)
    }
}



export const getMe = async(dispatch)=>{
    try{
        dispatch(getMeStart())
        const {data} = await axios.get(`${SERVER_URL}/api/users/me`, {withCredentials:true})
        dispatch(getMeSuccess(data.user))
    }catch(err){
        dispatch(getMeFailure(err))
    }
}

export const getUserByEmail = async(email,spaceId,setUser,setLoading,setError)=>{
        setLoading(true)
    try{
        const {data} = await axios.get(`${SERVER_URL}/api/workspace/spaces/byemail/${email}/${spaceId}`,{withCredentials:true})
        setUser(data.user)
        setError(null)
        setLoading(false)
    }catch(err){
        setError(err.response.data.message)   
        setLoading(false)
        setUser(null)
    }
}