import { Building2, Edit, FolderClock, Plus, Settings } from 'lucide-react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { useState } from 'react';
import { formatDate } from '@/lib/helper/formatDateTime';
import { Link } from 'react-router-dom';
import { useProjectsQuery } from '@/lib/api/project-api';
import {
   ProjectPayload,
   ProjectFilterDto,
} from 'freelanceman-common/src/schemas';
import { cn } from '@/lib/helper/utils';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import {
   ApiErrorPlaceHolder,
   LoadingPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { UseQueryResult } from '@tanstack/react-query';
import { defaultProject } from '@/components/shared/ui/helpers/constants/default-values';
import AddButton from '@/components/shared/ui/AddButton';

const ClientProjectSection: React.FC<ClientSectionProps> = ({ clientData }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      clientId: clientData?.id,
   });
   const projectQueryResult = useProjectsQuery(projectFilter);

   const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      setProjectFilter((prevFilter) => ({
         ...prevFilter,
         title: searchValue,
      }));
   };

   const handleClientSettings = () => {
      console.log('clicked');
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'client-page',
         data: clientData,
         type: 'client-settings',
         entity: 'client',
      });
   };

   const handleNewProject = () => {
      setFormDialogState({
         isOpen: true,
         data: { ...defaultProject, clientId: clientData.id },
         entity: 'project',
         mode: 'create',
         openedOn: 'client-page',
         type: 'new-project',
      });
   };

   return (
      <div
         className={`flex flex-col w-full sm:w-full gap-[6px] grow p-4 pt-2
            bg-foreground rounded-[20px] overflow-hidden shadow-md`}
      >
         <div className="flex justify-between">
            <div className="flex items-center h-[40px] justify-between w-full">
               <div className="flex gap-1 items-center cursor-pointer" onClick={handleClientSettings}>
                  <Building2 className="w-[28px] h-auto" />
                  <p className="text-xl leading-none">
                     {clientData.name}
                  </p>
               </div>
               <AddButton
                  onClick={handleNewProject}
               />
            </div>
         </div>
         <div className="flex justify-between items-center">
            <SearchBox
               className="border rounded-full h-7 w-[250px]"
               onChange={handleSearchInput}
            />
         </div>
         <ProjectList
            projectQueryResult={projectQueryResult}
            clientId={clientData.id}
            className="pt-1"
         />
      </div>
   );
};

interface ProjectListProps {
   projectQueryResult: UseQueryResult<ProjectPayload[]>;
   placeHolder?: string;
   clientId: string;
   className: string;
}

const ProjectList: React.FC<ProjectListProps> = ({
   projectQueryResult,
   clientId,
   placeHolder = 'Add new project to this client',
   className,
}) => {
   const {
      data: projectsData,
      isLoading,
      isError,
      refetch,
   } = projectQueryResult;
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

   if (!projectsData.length) {
      return (
         <NoDataPlaceHolder addFn={handleNewProject}>
            {placeHolder}
         </NoDataPlaceHolder>
      );
   }

   const projectListItems = projectsData.map((project) => {
      return <ProjectTab project={project} key={project.id} />;
   });

   return (
      <div className={cn('flex flex-col gap-1', className)}>
         {projectListItems}
      </div>
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
         <div className="z-10 flex items-center px-3 justify-between w-full text-[#333333]">
            <p className="font-medium max-w-[700px] text-md truncate cursor-default">
               {project.title}
            </p>
            <div className="flex items-center gap-2 text-freelanceman-darkgrey">
               <FolderClock className="w-4 h-4" />
               <p>{formattedDateModified}</p>
            </div>
         </div>
         <div className="absolute opacity-30 group-hover:opacity-65 w-full h-full bg-gradient-to-r from-white to-transparent transition-opacity"></div>
      </Link>
   );
};

export default ClientProjectSection;
