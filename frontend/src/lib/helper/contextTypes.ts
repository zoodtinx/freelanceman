import { Project, Task } from "@types";


interface Filter {
   projectStatus: Project["projectStatus"] | 'all',
   paymentStatus: Project["paymentStatus"] | 'all',
   viewMode: 'grid' | 'list',
   sortBy: 'dateModified' | 'dateCreated' | 'name',
   sortOrder: 'asc' | 'desc',
   searchTerm: string 
   client: string,
}

interface ProjectsViewContextType {
   currentFilter: Filter;
   projects: Project[];
   setFilter: (type: FilterType, status: StatusMap[FilterType]) => void;
   setProjects: (projects: Project[]) => void;
   setViewMode: (viewMode: 'grid' | 'list') => void;
   setDialogData: (project: Project) => void;
   viewMode: 'grid' | 'list';
   clientList: string[];
   isTaskDialogOpen: DialogueState
   setIsTaskDialogOpen: (state: DialogueState) => void;
   isSettingsDialogOpen : DialogueState,
   setIsSettingsDialogOpen : (state: DialogueState) => void;
}

type FilterType = 'projectStatus' | 'paymentStatus' | 'client' | 'searchTerm';

type StatusMap = {
   projectStatus: Project["projectStatus"] | 'all';
   paymentStatus: Project["paymentStatus"] | 'all';
   client: string;
   searchTerm: string;
};

interface DialogueState {
   isOpen: boolean,
   id: string
}

export type {Filter, ProjectsViewContextType, FilterType, StatusMap, DialogueState}