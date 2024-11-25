import { createSlice } from '@reduxjs/toolkit';
import { mockProjects } from '@/lib/mock/projects';

const activeProjectSlice = createSlice({
   name: 'activeProject',
   initialState: {
      project: mockProjects[4],
   },
   reducers: {
      setActiveProject: (state, action) => {
         state.project = action.payload;
      },
   },
});
export const { setActiveProject } = activeProjectSlice.actions;
export default activeProjectSlice.reducer;
