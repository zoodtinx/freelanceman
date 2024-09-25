import { createSlice } from "@reduxjs/toolkit";
import { UserProfile } from "@types"

const userProfileSlice = createSlice({
   name: 'userProfile',
   initialState: [] as UserProfile[],
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
export const { pinProject, unpinProject } = userProfileSlice.actions;
export default userProfileSlice.reducer;