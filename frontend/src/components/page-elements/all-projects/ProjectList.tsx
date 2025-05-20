import { Link } from 'react-router-dom';
import {
   ProjectCardProps,
   ProjectListProps,
} from '@/components/page-elements/all-projects/props.type';
import { EllipsisVertical, FolderClock, Plus } from 'lucide-react';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import {
   ApiErrorPlaceHolder,
   LoadingPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { formatDate } from '@/lib/helper/formatDateTime';
import { ProjectListPayload, ProjectPayload } from 'freelanceman-common';
import { cn } from '@/lib/helper/utils';
import { UseQueryResult } from '@tanstack/react-query';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';

interface ProjectListProps {
   queryResult: UseQueryResult<ProjectListPayload>;
   placeHolder?: string;
   clientId: string;
   className: string;
}

export const ProjectList: React.FC<ProjectListProps> = ({
   queryResult,
   clientId,
   placeHolder = 'Add new project to this client',
   className,
}) => {
   const { data: projectsData, isLoading, isError, refetch } = queryResult;
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const handleNewProject = () => {
      setFormDialogState({
         isOpen: true,
         data: { ...defaultProject, clientId: clientId },
         entity: 'project',
         mode: 'create',
         openedOn: 'client-page',
         type: 'new-project',
      });
   };

   if (isLoading) {
      return <LoadingPlaceHolder />;
   }

   if (isError || !projectsData) {
      return <ApiErrorPlaceHolder retryFn={refetch} />;
   }

   if (!projectsData.items.length) {
      return (
         <NoDataPlaceHolder addFn={handleNewProject}>
            {placeHolder}
         </NoDataPlaceHolder>
      );
   }

   const projectListItems = projectsData.items.map((project) => {
      return <ProjectTab project={project} key={project.id} />;
   });

   return (
      <ScrollArea className="w-full h-full">
         <div className={cn('flex flex-col gap-1 h-full box-border')}>
            {projectListItems}
         </div>
      </ScrollArea>
   );
};

const ProjectTab: React.FC<{ project: ProjectPayload }> = ({ project }) => {
   const formattedDateModified = formatDate(project.updatedAt, 'LONG');

   return (
      <Link
         to={`../../projects/${project.id}`}
         style={{
            backgroundColor: `var(--freelanceman-theme-${project.client.themeColor})`,
            borderColor: `var(--freelanceman-theme-${project.client.themeColor})`,
         }}
         className={`flex rounded-[15px] h-[40px] relative transition-colors
                     hover:border-primary border group overflow-hidden cursor-default`}
      >
         <div className="z-10 flex items-center px-3 justify-between w-full text-constant-primary">
            <p className="font-medium text-md cursor-default line-clamp-1">
               {project.title}
            </p>
            <div className="flex items-center gap-2 text-constant-primary shrink-0 opacity-50">
               <FolderClock className="w-4 h-4" />
               <p>{formattedDateModified}</p>
            </div>
         </div>
         <div className="absolute opacity-30 group-hover:opacity-65 w-full h-full bg-gradient-to-r from-white to-transparent transition-opacity"></div>
      </Link>
   );
};

export default ProjectList;
