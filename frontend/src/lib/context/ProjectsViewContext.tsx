import { useContext, createContext, useState } from 'react';
import type { Project, ProjectSearchOptions } from '@types';
import type {
   ProjectsViewContextType,
} from '../types/project-view-context.types';
import { ProjectSettingDialogState, TaskEventDialogState } from '../types/dialog.types';
import { formDefaultValue } from 'src/components/shared/ui/constants';

const useProjectsView = () => {
   const [projects, setProjects] = useState<Project[]>([]);
   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const [taskDialogState, setTaskDialogState] = useState<TaskEventDialogState>({
      isOpen: false,
      id: '',
      actionType: 'task',
      mode: 'view',
      data: {
         ...formDefaultValue('task'),
         id: '',
      },
   });

   const [projectSettingDialogState, setProjectSettingDialogState] = useState<ProjectSettingDialogState>({
      isOpen: false,
      id: '',
      data: {
         id: '',
         name: '',
         client: '',
         clientId: '',
         quickTaskId: '',
         brief: '',
         projectStatus: 'active',
         paymentStatus: 'notProcessed',
         accentColor: '',
         dateCreated: '',
         dateModified: ''
      }
   });

   const [filter, setFilter] = useState<ProjectSearchOptions>({});

   return {
      projects,
      setProjects,
      viewMode,
      setViewMode,
      taskDialogState,
      setTaskDialogState,
      projectSettingDialogState,
      setProjectSettingDialogState,
      filter,
      setFilter
   };
};

const ProjectsViewContext = createContext<ProjectsViewContextType>();

export const ProjectsViewProvider = ({ children }) => {
   const {
      projects,
      setProjects,
      viewMode,
      setViewMode,
      taskDialogState,
      setTaskDialogState,
      projectSettingDialogState,
      setProjectSettingDialogState,
      filter,
      setFilter
   } = useProjectsView();

   return (
      <ProjectsViewContext.Provider
         value={{
            projects,
            setProjects,
            viewMode,
            setViewMode,
            taskDialogState,
            setTaskDialogState,
            projectSettingDialogState,
            setProjectSettingDialogState,
            filter,
            setFilter
         }}
      >
         {children}
      </ProjectsViewContext.Provider>
   );
};

export const useProjectsViewContext = () => {
   const context = useContext(ProjectsViewContext);
   if (!context) {
      throw new Error(
         'useProjectsViewContext must be used within a ProjectViewProvider'
      );
   }
   return context;
};
