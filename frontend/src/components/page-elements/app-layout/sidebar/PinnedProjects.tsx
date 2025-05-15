import { cn } from '@/lib/helper/utils';
import {
   useEditProject,
   useProjectSelectionQuery,
   useProjectsQuery,
} from '@/lib/api/project-api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProjectPayload } from 'freelanceman-common/src/schemas';
import { Minus, Pin, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { SelectWithSearch } from '@/components/shared/ui/form-field-elements';
import { ProjectFilterDto, ProjectListPayload } from 'freelanceman-common';
import React, { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';

export default function PinnedProjects() {
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      pinned: true,
   });
   const projectQueryResult = useProjectsQuery(projectFilter);
   const projectSelectionQueryResult = useProjectSelectionQuery();
   const editProject = useEditProject({
      errorCallback() {
         toast.error('Error pinning a project');
      },
   });

   const handlePinProject = (projectId: string) => {
      editProject.mutate({
         id: projectId,
         pinned: true,
      });
   };

   const handleSearchProject = (value: string) => {
      setProjectFilter((prev) => {
         return {
            ...prev,
            title: value,
         };
      });
   };

   return (
      <div className="flex flex-col md:hidden grow">
         <div className="flex items-center px-3 pb-2 gap-1 w-full text-secondary">
            <Pin className="stroke-[3px] w-4 h-4" />
            <div className="flex justify-between items-center w-full">
               <p className="text-sub">{'Pinned'}</p>
               <SelectWithSearch
                  isWithIcon={false}
                  optionalTriggerUi={
                     <Plus className="w-4 h-4 stroke-[3px] cursor-pointer" />
                  }
                  handleSearch={handleSearchProject}
                  handleSelect={handlePinProject}
                  selections={projectSelectionQueryResult.data}
                  type="project"
                  isLoading={projectSelectionQueryResult.isLoading}
               />
            </div>
         </div>
         <PinnedProjectTabs projectQueryResult={projectQueryResult} />
      </div>
   );
}

const PinnedProjectTabs = ({
   projectQueryResult,
}: {
   projectQueryResult: UseQueryResult<ProjectListPayload>;
}) => {
   const { data: projects, isLoading, isError } = projectQueryResult;

   if (isLoading) {
      return (
         <div className="flex flex-col px-[6px] gap-2">
            <Skeleton className="h-[64px] rounded-xl" />
            <Skeleton className="h-[64px] rounded-xl" />
         </div>
      );
   }

   if (isError) {
      return null;
   }

   const pinnedProjects = projects?.items.map((project) => {
      return <PinnedProjectCard project={project} key={project.id} />;
   });

   return (
      <div className="flex flex-col  gap-2 border border-tertiary p-2 rounded-xl">
         {pinnedProjects}
      </div>
   );
};

const PinnedProjectCard = ({ project }: { project: ProjectPayload }) => {
   const { projectId } = useParams();
   const navigate = useNavigate();
   const isActive = projectId === project.id;

   const editProject = useEditProject({
      errorCallback() {
         toast.error('Error unpinning a project');
      },
   });

   const handleUnpin = (e: React.MouseEvent) => {
      e.stopPropagation()
      editProject.mutate({
         id: project.id,
         pinned: false,
      });
   };

   const handleClick = () => {
      navigate(`/home/projects/${project.id}`);
   };

   return (
      <div
         onClick={handleClick}
         className={cn(
            'p-1 px-2 border border-tertiary border-dashed rounded-lg cursor-pointer relative group',
            isActive && 'text-primary bg-tertiary border-secondary',
            !isActive && 'bg-transparent text-secondary border border-tertiary'
         )}
      >
         <button
            onClick={handleUnpin}
            className={`absolute -top-1 -right-1 z-30 bg-foreground rounded-full p-1 opacity-0
                         group-hover:opacity-100 transition-opacity duration-75 border border-secondary`}
         >
            <Minus className="text-primary w-3 h-3 stroke-[4px]" />
         </button>
         <p className="line-clamp-2">
            <span></span>
            {project.title}
         </p>
      </div>
   );
};
