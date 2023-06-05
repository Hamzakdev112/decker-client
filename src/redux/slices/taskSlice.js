import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';


const taskSlice = createSlice({
    name: 'Tasks',
    initialState:{
        isFetching:false,
        error:false,
        tasksBySpaceId:null,
        singeTaskDialogOpen:false
    },
    reducers:{
        setSingleTaskDialogOpen:(state)=>{
            state.singeTaskDialogOpen = true
        },
        setSingleTaskDialogOpen:(state)=>{
            state.singeTaskDialogOpen = true
        },
        getTasksBySpaceIdStart:(state)=>{
            state.isFetching = true
        },
        getTasksBySpaceIdSuccess:(state, action)=>{
            state.isFetching = false
            state.tasksBySpaceId = action.payload
            state.error = null
        },
        getTasksBySpaceIdFailure:(state, action)=>{
            state.error = action.payload
            state.tasksBySpaceId = null
            state.isFetching = false
        },
        updateTasksList:(state,action)=>{
            const task = action.payload
            return produce(state,(draftState)=>{
                 draftState.tasksBySpaceId.unshift(task)
            })
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

export const {setSingleTaskDialogOpen,updateTasksList,getTasksBySpaceIdStart, getTasksBySpaceIdSuccess, getTasksBySpaceIdFailure, updateStatus,updatePriority,updateName} = taskSlice.actions
export default taskSlice.reducer