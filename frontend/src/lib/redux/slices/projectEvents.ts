import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProjectListFilter, Event } from '@types';
import { filterTasksAndEvents } from '../helper/filter';

const projectEvents = createSlice({
   name: 'projectEvents',
   initialState: {
      originalEvents: [] as Event[],
      filteredEvents: [] as Event[],
      filter: 'planned' as Event["status"]  
   },
   reducers: {
      setProjectEvents: (state, action: PayloadAction<Event[]>) => {
         state.originalEvents = action.payload;
      },
      filterEvents: (state, action: PayloadAction<ProjectListFilter>) => {
         state.filteredEvents = filterTasksAndEvents(state.originalEvents, action.payload);
      }
   },
});

export const { setProjectEvents, filterEvents } = projectEvents.actions;
export default projectEvents.reducer;