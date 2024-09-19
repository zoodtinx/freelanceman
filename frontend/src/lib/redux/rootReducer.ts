import { combineReducers } from "@reduxjs/toolkit";
import exampleSlice from './slices/exampleSlice'

const rootReducer = combineReducers({
   example: exampleSlice
})

export default rootReducer