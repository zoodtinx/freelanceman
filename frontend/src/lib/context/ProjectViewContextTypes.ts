import { ProjectPreview } from "@types";


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
   isTaskDialogOpen: DialogueState
   setIsTaskDialogOpen: (state: DialogueState) => void;
   isSettingsDialogOpen : DialogueState,
   setIsSettingsDialogOpen : (state: DialogueState) => void;
}

type FilterType = 'projectStatus' | 'paymentStatus' | 'client' | 'searchTerm';

type StatusMap = {
   projectStatus: ProjectPreview["projectStatus"] | 'all';
   paymentStatus: ProjectPreview["paymentStatus"] | 'all';
   client: string;
   searchTerm: string;
};

interface DialogueState {
   isOpen: boolean,
   id: string
}

export type {Filter, ProjectsViewContextType, FilterType, StatusMap, DialogueState}