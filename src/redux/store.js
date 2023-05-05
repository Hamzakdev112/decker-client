import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import spaceReducer from './slices/spaceSlice'
import taskReducer from './slices/taskSlice'
import createSpaceReducer from './slices/createSpace'

const rootReducer = combineReducers({
    user:userReducer,
    spaces:spaceReducer,
    tasks:taskReducer,
    createSpace:createSpaceReducer
})


export default  configureStore({
    reducer:rootReducer
})