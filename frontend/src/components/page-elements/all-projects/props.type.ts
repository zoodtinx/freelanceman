import { UseQueryResult } from '@tanstack/react-query';
import { ProjectListPayload } from 'freelanceman-common';
import {
   ProjectPayload,
   ProjectFilterDto,
   TaskPayload,
} from 'freelanceman-common';
import { Dispatch, SetStateAction } from 'react';

export interface ProjectListProps {
   queryResult: UseQueryResult<ProjectListPayload>;
   handleLoadMore: (value: number) => void;
}

export interface ProjectCardProps {
   project: ProjectPayload;
}

export interface ProjectFilterProps {
   projectFilter: ProjectFilterDto;
   setProjectFilter: Dispatch<SetStateAction<ProjectFilterDto>>;
   viewMode: 'grid' | 'list';
   setViewMode: Dispatch<SetStateAction<'grid' | 'list'>>;
   className?: string
}

export type ProjectFilterBubble = Pick<
   ProjectFilterProps,
   'projectFilter' | 'setProjectFilter' | 'className'
>;

export type ViewModeToggleBubble = Pick<
   ProjectFilterProps,
   'viewMode' | 'setViewMode'
>;

export interface QuickTaskBubbleProps {
   task: TaskPayload;
   projectStatus: string;
}