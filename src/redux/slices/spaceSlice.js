import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';


const spaceSlice = createSlice({
    name: 'Spaces',
    initialState:{
        isFetching:false,
        error:false,
        mySpaces:null,
        singleSpace:null,
        addColumnOpen:false
    },
    reducers:{
        getAllSpacesStart:(state)=>{
            state.isFetching = true
        },
        getAllSpacesSuccess:(state, action)=>{
            state.isFetching = false
            state.mySpaces = action.payload
            state.error = false
        },
        getAllSpacesFailure:(state, action)=>{
            state.error = action.payload
            state.isFetching = false
        },
        getSpaceByIdStart:(state)=>{
            state.isFetching = true
        },
        getSpaceByIdSuccess:(state, action)=>{
            state.isFetching = false
            state.singleSpace = action.payload
            state.error = false
        },
        getSpaceByIdFailure:(state, action)=>{
            state.isFetching = false
            state.error = action.payload
        },
        setAddColumnOpen:(state, action)=>{
            state.addColumnOpen = action.payload
        },
        updateColumns:(state,action)=>{
            const {id,columns} = action.payload
            return produce(state,(draftState)=>{
                // const index = draftState.singleSpace.columns.findIndex((column) =>column._id === id);
                draftState.singleSpace.columns = [...columns]
            })
        },
    }
})

export const {getAllSpacesStart,
     getAllSpacesSuccess,
      getAllSpacesFailure,
       getSpaceByIdStart,
        getSpaceByIdSuccess,
         getSpaceByIdFailure,
         setAddColumnOpen,
         updateColumns,

} = spaceSlice.actions
export default spaceSlice.reducer