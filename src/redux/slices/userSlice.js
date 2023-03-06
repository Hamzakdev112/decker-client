import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'User',
    initialState:{
        user:null,
        isFetching:false,
        error:false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching = true
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false
        },
        loginFailure:(state, action)=>{
            state.error = action.payload
            state.isFetching = false
        },
        getMeStart:(state)=>{
            state.isFetching = true
        },
        getMeSuccess:(state, action)=>{
            state.isFetching = false
            state.user = action.payload
        },
        getMeFailure:(state, action)=>{
            state.error = action.payload
            state.isFetching = false
        },
    }
})

export const {loginStart, loginSuccess, loginFailure, getMeStart, getMeSuccess, getMeFailure} = userSlice.actions
export default userSlice.reducer