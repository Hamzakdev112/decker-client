import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import spaceReducer from './slices/spaceSlice'
import taskReducer from './slices/taskSlice'

const rootReducer = combineReducers({
    user:userReducer,
    spaces:spaceReducer,
    tasks:taskReducer
})


export default  configureStore({
    reducer:rootReducer
})