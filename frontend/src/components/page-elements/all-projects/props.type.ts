import { UseQueryResult } from '@tanstack/react-query';
import {
   ProjectPayload,
   ProjectFilterDto,
   TaskPayload,
} from 'freelanceman-common/dist/types/src/schemas';
import { Dispatch, SetStateAction } from 'react';

export interface ProjectListProps {
   queryResult: UseQueryResult<ProjectPayload[], Error>;
}

export interface ProjectCardProps {
   project: ProjectPayload;
}

export interface ProjectFilterProps {
   projectFilter: ProjectFilterDto;
   setProjectFilter: Dispatch<SetStateAction<ProjectFilterDto>>;
   viewMode: 'grid' | 'list';
   setViewMode: Dispatch<SetStateAction<'grid' | 'list'>>;
}

export type ProjectFilterBubble = Pick<
   ProjectFilterProps,
   'projectFilter' | 'setProjectFilter'
>;
export type ViewModeToggleBubble = Pick<
   ProjectFilterProps,
   'viewMode' | 'setViewMode'
>;

export interface QuickTaskBubbleProps {
   task: TaskPayload;
   projectStatus: string;
}
