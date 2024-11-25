import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProjectListFilter, Task } from '@types';
import { filterTasksAndEvents } from '../helper/filter';

const projectTasksSlice = createSlice({
   name: 'projectTasks',
   initialState: {
      originalTasks: [] as Task[],
      filteredTasks: [] as Task[],
      filter: 'planned' as Task["status"]  
   },
   reducers: {
      setProjectTasks: (state, action: PayloadAction<Task[]>) => {
         state.originalTasks = action.payload;
      },
      filterTasks: (state, action: PayloadAction<ProjectListFilter>) => {
         state.filteredTasks = filterTasksAndEvents(state.originalTasks, action.payload);
      }
   },
});

export const { setProjectTasks, filterTasks } = projectTasksSlice.actions;
export default projectTasksSlice.reducer;