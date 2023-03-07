import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';


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
        updateStatus:(state,action)=>{
            const {id,status} = action.payload
            return produce(state,(draftState)=>{
                const index = draftState.tasksBySpaceId.findIndex((task) =>task._id === id);
                draftState.tasksBySpaceId[index].status = status
            })
        },
        updatePriority:(state,action)=>{
            const {id,priority} = action.payload
            return produce(state,(draftState)=>{
                const index = draftState.tasksBySpaceId.findIndex((task) =>task._id === id);
                draftState.tasksBySpaceId[index].priority = priority
            })
        },
        updateName:(state,action)=>{
            const {id,name} = action.payload
            return produce(state,(draftState)=>{
                const index = draftState.tasksBySpaceId.findIndex((task) =>task._id === id);
                draftState.tasksBySpaceId[index].name = name
            })
        },
    }
})

export const {getTasksBySpaceIdStart, getTasksBySpaceIdSuccess, getTasksBySpaceIdFailure, updateStatus,updatePriority,updateName} = taskSlice.actions
export default taskSlice.reducer