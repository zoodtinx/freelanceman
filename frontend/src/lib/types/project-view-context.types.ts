import { TaskEventDialogState, ProjectSettingDialogState } from './dialog.types';
import type { Project } from '@types';

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
   currentFilter: Filter;
   projects: Project[];
   setFilter: (type: FilterType, status: StatusMap[FilterType]) => void;
   setProjects: (projects: Project[]) => void;
   setViewMode: (viewMode: 'grid' | 'list') => void;
   viewMode: 'grid' | 'list';
   clientList: string[];
   taskDialogState: TaskEventDialogState;
   setTaskDialogState: (state: TaskEventDialogState) => void;
   projectSettingDialogState: ProjectSettingDialogState;
   setProjectSettingDialogState: (state: ProjectSettingDialogState) => void;
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
