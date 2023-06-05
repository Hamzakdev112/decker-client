import { createSlice } from "@reduxjs/toolkit";
import InfoIcon from '@mui/icons-material/Info';

const createSpaceSlice = createSlice({
    name: 'Create Space',
    initialState:{
        color:'red',
        selectedColumns:[]
    },
    reducers:{
        setColor:(state,action)=>{
            state.color = action.payload;
        },
        addToSelectedColumns:(state,action)=>{
            state.selectedColumns = [...state.selectedColumns, action.payload];
        },
        removeFromSelectedColumns:(state,action)=>{
            state.selectedColumns = state.selectedColumns.filter((item) => item.name !== action.payload);
        },
    }
})

export const {
            setColor,
            addToSelectedColumns,
            removeFromSelectedColumns
} = createSpaceSlice.actions
export default createSpaceSlice.reducer