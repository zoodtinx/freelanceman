import { ProjectPreview } from '@types';
import { TaskEventDialogState, ProjectSettingDialogState } from './dialog.types';

interface Filter {
   projectStatus: ProjectPreview['projectStatus'] | 'all';
   paymentStatus: ProjectPreview['paymentStatus'] | 'all';
   viewMode: 'grid' | 'list';
   sortBy: 'dateModified' | 'dateCreated' | 'name';
   sortOrder: 'asc' | 'desc';
   searchTerm: string;
   client: string;
}

interface ProjectsViewContextType {
   currentFilter: Filter;
   projects: ProjectPreview[];
   setFilter: (type: FilterType, status: StatusMap[FilterType]) => void;
   setProjects: (projects: ProjectPreview[]) => void;
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
   projectStatus: ProjectPreview['projectStatus'] | 'all';
   paymentStatus: ProjectPreview['paymentStatus'] | 'all';
   client: string;
   searchTerm: string;
};

export type {
   Filter,
   ProjectsViewContextType,
   FilterType,
   StatusMap,
};
