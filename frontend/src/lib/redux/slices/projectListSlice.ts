import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProjectListFilter, Project, ProjectStatus } from '@types';
import { filterProjects } from '../helper/filter';

const projectListSlice = createSlice({
   name: 'projectList',
   initialState: {
      originalProjects: [] as Project[],
      filteredProjects: [] as Project[],
      viewMode: 'grid',
      currentFilter: {
         sortBy: 'dateModified',
         sortOrder: 'desc',
         projectStatus: 'all',
         paymentStatus: 'all',
      } as ProjectListFilter,
   },
   reducers: {
      setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
         state.viewMode = action.payload;
      },
      setProjectList: (state, action) => {
         const filteredProjects = filterProjects(
            action.payload,
            state.currentFilter
         );
         state.originalProjects = filteredProjects;
         state.filteredProjects = filteredProjects;
      },
      sortBy: (state, action) => {
         state.currentFilter.sortBy = action.payload;
         state.filteredProjects = filterProjects(
            state.originalProjects,
            state.currentFilter
         );
      },
      sortOrder: (state, action: PayloadAction<'asc' | 'desc'> ) => {
         state.currentFilter.sortOrder = action.payload;
         state.filteredProjects = filterProjects(
            state.originalProjects,
            state.currentFilter
         );
      },
      filterProjectStatus: (state, action: PayloadAction<ProjectStatus>) => {
         state.currentFilter.projectStatus = action.payload;
         state.filteredProjects = filterProjects(
            state.originalProjects,
            state.currentFilter
         );
      },
      filterPaymentStatus: (state, action) => {
         state.currentFilter.paymentStatus = action.payload;
         state.filteredProjects = filterProjects(
            state.originalProjects,
            state.currentFilter
         );
      },
      search: (state, action) => {
         state.filteredProjects = state.originalProjects.filter((project) => {
            return (
               project.name.toLowerCase().includes(action.payload.toLowerCase())
            );
         });
      }
   },
});

export const {
   setProjectList,
   filterProjectStatus,
   filterPaymentStatus,
   sortBy,
   sortOrder,
   setViewMode,
   search
} = projectListSlice.actions;
export default projectListSlice.reducer;