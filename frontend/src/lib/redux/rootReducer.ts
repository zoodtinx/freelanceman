import { combineReducers } from "@reduxjs/toolkit";
import activePageSlice from "./slices/activePageSlice";
import userProfileSlice from "./slices/userProfileSlice"

const rootReducer = combineReducers({
   activePage: activePageSlice,
   userProfile: userProfileSlice
})

export default rootReducer