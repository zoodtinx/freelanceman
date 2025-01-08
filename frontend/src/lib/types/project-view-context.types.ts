import { TaskEventDialogState, ProjectSettingDialogState } from './dialog.types';
import type { Project, ProjectSearchOptions } from '@types';

interface Filter {
   projectStatus: Project['projectStatus'] | 'all';
   paymentStatus: Project['paymentStatus'] | 'all';
   viewMode: 'grid' | 'list';
   sortBy: 'dateModified' | 'dateCreated' | 'name';
   sortOrder: 'asc' | 'desc';
   searchTerm: string;
   client: string;
}

interface ProjectsViewContextType {
   projects: Project[];
   setProjects: (projects: Project[]) => void;
   viewMode: 'grid' | 'list';
   setViewMode: (viewMode: 'grid' | 'list') => void;
   taskDialogState: TaskEventDialogState;
   setTaskDialogState: (state: TaskEventDialogState) => void;
   projectSettingDialogState: ProjectSettingDialogState;
   setProjectSettingDialogState: (state: ProjectSettingDialogState) => void;
   filter: ProjectSearchOptions;
   setFilter: (newFilter: ProjectSearchOptions | ((prevState: ProjectSearchOptions) => ProjectSearchOptions)) => void;
}


type FilterType = 'projectStatus' | 'paymentStatus' | 'client' | 'searchTerm';

type StatusMap = {
   projectStatus: Project['projectStatus'] | 'all';
   paymentStatus: Project['paymentStatus'] | 'all';
   client: string;
   searchTerm: string;
};

export type {
   Filter,
   ProjectsViewContextType,
   FilterType,
   StatusMap,
};
