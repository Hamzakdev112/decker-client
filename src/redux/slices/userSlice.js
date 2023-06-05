import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'User',
    initialState:{
        user:null,
        isFetching:false,
        registerLoading:false,
        loginLoading:false,
        error:false,
    },
    reducers:{
        loginStart:(state)=>{
            state.loginLoading = true
        },
        loginSuccess:(state, action)=>{
            state.loginLoading = false
        },
        loginFailure:(state, action)=>{
            state.error = action.payload
            state.loginLoading = false
        },
        registerStart:(state)=>{
            state.registerLoading = true
        },
        registerSuccess:(state, action)=>{
            state.registerLoading = false
        },
        registerFailure:(state, action)=>{
            state.error = action.payload
            state.registerLoading = false
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

export const {
              loginStart,
              loginSuccess,
              loginFailure,
              registerStart,
              registerSuccess,
              registerFailure,
              getMeStart,
              getMeSuccess,
              getMeFailure
            } = userSlice.actions
export default userSlice.reducer