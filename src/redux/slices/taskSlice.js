import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
    name: 'Tasks',
    initialState:{
        isFetching:false,
        error:false,
        tasksBySpaceId:null
    },
    reducers:{
        getTasksBySpaceIdStart:(state)=>{
            state.isFetching = true
        },
        getTasksBySpaceIdSuccess:(state, action)=>{
            state.isFetching = false
            state.tasksBySpaceId = action.payload
        },
        getTasksBySpaceIdFailure:(state, action)=>{
            state.error = action.payload
            state.isFetching = false
        },
    }
})

export const {getTasksBySpaceIdStart, getTasksBySpaceIdSuccess, getTasksBySpaceIdFailure} = taskSlice.actions
export default taskSlice.reducer