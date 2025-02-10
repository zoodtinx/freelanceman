import { FormDialogState } from '@/lib/types/dialog.types';
import { Project, ProjectSearchOption } from '@types';
import { Dispatch, SetStateAction } from 'react';

export interface ProjectListProps {
   projects: Project[];
   isLoading: boolean;
   setTaskDialogState: Dispatch<SetStateAction<FormDialogState>>;
   setProjectSettingDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export interface ProjectCardProps {
   project: Project;
   setTaskDialogState: Dispatch<SetStateAction<FormDialogState>>;
   setProjectSettingDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export interface ProjectFilterProps {
   projectFilter: ProjectSearchOption;
   setProjectFilter: Dispatch<SetStateAction<ProjectSearchOption>>;
   viewMode: 'grid' | 'list';
   setViewMode: Dispatch<SetStateAction<'grid' | 'list'>>;
}

export type ProjectFilterBubble = Pick<ProjectFilterProps, 'projectFilter' | 'setProjectFilter'>
export type ViewModeToggleBubble = Pick<ProjectFilterProps, 'viewMode' | 'setViewMode'>
