import { UseQueryResult } from '@tanstack/react-query';
import { ProjectFindManyResponse } from 'freelanceman-common';
import {
   ProjectFindManyItem,
   ProjectFilterDto,
   TaskFindOneResponse,
} from 'freelanceman-common';
import { Dispatch, SetStateAction } from 'react';

export interface ProjectListProps {
   queryResult: UseQueryResult<ProjectFindManyResponse>;
   handleLoadMore: (value: number) => void;
}

export interface ProjectCardProps {
   project: ProjectFindManyItem;
}

export interface ProjectFilterProps {
   projectFilter: ProjectFilterDto;
   setProjectFilter: Dispatch<SetStateAction<ProjectFilterDto>>;
   viewMode: 'grid' | 'list';
   setViewMode: Dispatch<SetStateAction<'grid' | 'list'>>;
   className?: string
   isFetching: boolean
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
   task: TaskFindOneResponse;
   projectStatus: string;
}