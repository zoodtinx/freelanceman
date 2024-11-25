import { useSelector, useDispatch } from 'react-redux';
import {
   setProjectList as setProjectListReducer,
   filterProjectStatus as filterProjectStatusReducer,
   filterPaymentStatus as filterPaymentStatusReducer,
   sortBy as sortByReducer,
   sortOrder as sortOrderReducer,
   setViewMode as setViewModeReducer,
   search as searchReducer,
} from '@/lib/redux/slices/projectListSlice';
import type { RootState } from '../store';
import type { Project, SortOption, PaymentStatus, ProjectStatus } from '@types';

export function useProjectList() {
   const dispatch = useDispatch();
   const projectList = useSelector(
      (state: RootState) => state.projectList.filteredProjects
   );

   const viewMode = useSelector(
      (state: RootState) => state.projectList.viewMode
   );

   const setProjectList = (newProjectList: Project[]) => {
      dispatch(setProjectListReducer(newProjectList));
   };

   const sortBy = (option: SortOption) => {
      dispatch(sortByReducer(option));
   };

   const sortOrder = (option: 'asc' | 'desc') => {
      dispatch(sortOrderReducer(option));
   };

   const filterProjectStatus = (status: ProjectStatus) => {
      dispatch(filterProjectStatusReducer(status));
   };

   const filterPaymentStatus = (status: PaymentStatus) => {
      dispatch(filterPaymentStatusReducer(status));
   };

   const search = (keyword: string) => {
      dispatch(searchReducer(keyword));
   };

   const setViewMode = (mode: 'grid' | 'list') => {
      dispatch(setViewModeReducer(mode));
   };

   return {
      projectList,
      viewMode,
      setProjectList,
      sortBy,
      sortOrder,
      filterProjectStatus,
      filterPaymentStatus,
      search,
      setViewMode
   };
}
