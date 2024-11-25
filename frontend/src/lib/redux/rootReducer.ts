import { combineReducers } from "@reduxjs/toolkit";
import userProfileSlice from "./slices/userProfileSlice"
import activeProject from "./slices/activeProjectSlice";
import projectListSlice from "./slices/projectListSlice";
import projectTasksSlice from "./slices/projectTasksSlice";
import { projectApi } from "./apiSlices/projectApi";

const rootReducer = combineReducers({
   userProfile: userProfileSlice,
   activeProject: activeProject,
   projectList: projectListSlice,
   [projectApi.reducerPath]: projectApi.reducer,
})

export default rootReducer