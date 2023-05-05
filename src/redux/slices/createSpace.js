import { createSlice } from "@reduxjs/toolkit";
import InfoIcon from '@mui/icons-material/Info';

const createSpaceSlice = createSlice({
    name: 'Create Space',
    initialState:{
        color:'red',
    },
    reducers:{
        setColor:(state,action)=>{
            state.color = action.payload;
        }
    }
})

export const {
            setColor,
} = createSpaceSlice.actions
export default createSpaceSlice.reducer