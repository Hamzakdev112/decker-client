import { createSlice } from "@reduxjs/toolkit";


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
        },
        setAddColumnOpen:(state, action)=>{
            state.addColumnOpen = action.payload
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

} = spaceSlice.actions
export default spaceSlice.reducer