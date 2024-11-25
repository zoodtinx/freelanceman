import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "@types";

const pinnedProjectsSlice = createSlice({
   name: 'pinnedProjects',
   initialState: [] as Project[],
   reducers: {
      pinProject: (state, action) => {
         const pinnedProjects = [...state, action.payload];
         return pinnedProjects;
      },
      unpinProject: (state, action) => {
         const pinnedProjects = state.filter(project => project !== action.payload);
         return pinnedProjects;
      }
   }
});
export const { pinProject, unpinProject } = pinnedProjectsSlice.actions;
export default pinnedProjectsSlice.reducer;