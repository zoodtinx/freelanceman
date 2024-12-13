import { ActionFormData, ProjectPreview } from "@types";


interface Filter {
   projectStatus: ProjectPreview["projectStatus"] | 'all',
   paymentStatus: ProjectPreview["paymentStatus"] | 'all',
   viewMode: 'grid' | 'list',
   sortBy: 'dateModified' | 'dateCreated' | 'name',
   sortOrder: 'asc' | 'desc',
   searchTerm: string 
   client: string,
}

interface ProjectsViewContextType {
   currentFilter: Filter;
   projects: ProjectPreview[];
   setFilter: (type: FilterType, status: StatusMap[FilterType]) => void;
   setProjects: (projects: ProjectPreview[]) => void;
   setViewMode: (viewMode: 'grid' | 'list') => void;
   setDialogData: (project: ProjectPreview) => void;
   viewMode: 'grid' | 'list';
   clientList: string[];
   isTaskDialogOpen: DialogState
   setIsTaskDialogOpen: (state: DialogState) => void;
   isSettingsDialogOpen : DialogState,
   setIsSettingsDialogOpen : (state: DialogState) => void;
}

type FilterType = 'projectStatus' | 'paymentStatus' | 'client' | 'searchTerm';

type StatusMap = {
   projectStatus: ProjectPreview["projectStatus"] | 'all';
   paymentStatus: ProjectPreview["paymentStatus"] | 'all';
   client: string;
   searchTerm: string;
};

interface DialogState {
   isOpen: boolean,
   id: string,
   actionType: 'task' | 'event',
   mode: 'view' | 'create',
   data: ActionFormData
}

export type {Filter, ProjectsViewContextType, FilterType, StatusMap, DialogState}