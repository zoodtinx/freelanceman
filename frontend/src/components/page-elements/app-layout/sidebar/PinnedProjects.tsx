import { cn } from '@/lib/helper/utils';
import {
   useEditProject,
   useProjectSelectionQuery,
   useProjectsQuery,
} from '@/lib/api/project-api';
import { useNavigate, useParams } from 'react-router-dom';
import { Minus, Pin, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { SelectWithSearch } from '@/components/shared/ui/form-field-elements';
import React, { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import { ProjectFilterDto, ProjectFindManyItem, ProjectFindManyResponse } from 'freelanceman-common';

export default function PinnedProjects() {
   const [projectSelectionFilter, setSelectionFilter] = useState<ProjectFilterDto>({});
   const projectQueryResult = useProjectsQuery({pinned: true});
   const projectSelectionQueryResult = useProjectSelectionQuery(projectSelectionFilter);
   const editProject = useEditProject();

   const handlePinProject = (projectId: string) => {
      toast.loading('Pinning project...')
      editProject.mutate({
         id: projectId,
         pinned: true,
      });
   };

   const handleSearchProject = (value: string) => {
      setSelectionFilter((prev) => {
         return {
            ...prev,
            name: value,
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
   projectQueryResult: UseQueryResult<ProjectFindManyResponse>;
}) => {
   const { data: projects, isLoading, isError } = projectQueryResult;

   // loading logics
   if (isLoading) {
      return (
         <div className="flex flex-col px-[6px] gap-2">
            <Skeleton className="h-[64px] rounded-xl" />
            <Skeleton className="h-[64px] rounded-xl" />
         </div>
      );
   }

   // handle network error
   if (isError) {
      return null;
   }

   // handle empty projects list
   if (!projects || !projects?.total) {
      return <></>;
   }

   const pinnedProjects = projects?.items.map((project) => {
      return <PinnedProjectCard project={project} key={project.id} />;
   });

   return (
      <ScrollArea className="border border-tertiary rounded-xl max-h-72">
         <div className="flex flex-col gap-1 p-1 leading-snug">{pinnedProjects}</div>
      </ScrollArea>
   );
};

const PinnedProjectCard = ({ project }: { project: ProjectFindManyItem }) => {
   const { projectId } = useParams();
   const navigate = useNavigate();
   const isActive = projectId === project.id;

   const editProject = useEditProject();

   const handleUnpin = (e: React.MouseEvent) => {
      e.stopPropagation()
      toast.loading('Unpinning project...')
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
            'p-1 px-2 border border-tertiary border-dashed rounded-lg cursor-pointer relative group overflow-visible',
            isActive && 'text-primary bg-tertiary border-transparent',
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
         <p className="line-clamp-2 text-sm">
            <span></span>
            {project.name}
         </p>
      </div>
   );
};
