import { useSelector, useDispatch } from 'react-redux';
import { setActiveProject as setActiveProjectReducer } from '../slices/activeProjectSlice';
import type { RootState } from '../store';
import type { Project, SortOption, PaymentStatus, ProjectStatus } from '@types';

export function useActiveproject() {
   const dispatch = useDispatch();

   const project = useSelector(
      (state: RootState) => state.activeProject.project
   );
   const tasks = useSelector(
      (state: RootState) => state.activeProject.tasks
   );
   const events = useSelector(
      (state: RootState) => state.activeProject.events
   );
   const color = useSelector(
      (state: RootState) => state.activeProject.color
   );

   const setActiveProject = (project: Project) => {
      dispatch(setActiveProjectReducer(project));
   }
   
   return {
      project,
      tasks,
      events,
      color,
      setActiveProject,
   };
}
