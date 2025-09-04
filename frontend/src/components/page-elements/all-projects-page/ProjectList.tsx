import { useNavigate } from 'react-router-dom';
import { EllipsisVertical, FolderClock } from 'lucide-react';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import {
   ApiErrorPlaceHolder,
   LoadingPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { formatDate } from '@/lib/helper/formatDateTime';
import { cn } from '@/lib/helper/utils';
import { UseQueryResult } from '@tanstack/react-query';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import TabListPlaceHolder, { TabListAddButton, TabListPlaceholderTab } from '@/components/shared/ui/placeholder-ui/TabListPlaceholder';
import { defaultNewProjectValue } from '@/components/shared/ui/helpers/constants/default-values';
import {
   ProjectFindManyItem,
   ProjectFindManyResponse,
} from 'freelanceman-common';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';

interface ProjectListProps {
   queryResult: UseQueryResult<ProjectFindManyResponse>;
   placeHolder?: string;
   clientId: string;
   handleLoadMore: (value: number) => void;
   page: 'allProjectPage' | 'allClientPage';
}

export const ProjectList: React.FC<ProjectListProps> = ({
   queryResult,
   clientId,
   placeHolder = 'Add new project to this client',
   handleLoadMore,
   page,
}) => {
   const {
      data: projectsData,
      isLoading,
      isError,
      refetch,
      isFetching,
   } = queryResult;
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const handleNewProject = () => {
      setFormDialogState({
         isOpen: true,
         data: { ...defaultNewProjectValue, clientId: clientId },
         entity: 'project',
         mode: 'create',
         openedOn: 'clientPage',
         type: 'newProject',
      });
   };

   // loading logics
   if (isLoading) {
      return <LoadingPlaceHolder />;
   }

   // handle network error
   if (isError && !projectsData) {
      return <ApiErrorPlaceHolder retryFn={refetch} />;
   }

   // handle empty projects list
   if (!projectsData?.items?.length) {
      if (page === 'allProjectPage') {
         return (
            <TabListPlaceHolder addFn={handleNewProject} page="allProjectPage">
               {placeHolder}
            </TabListPlaceHolder>
         );
      }
      return (
         <NoDataPlaceHolder addFn={handleNewProject} className="w-full h-full">
            {placeHolder}
         </NoDataPlaceHolder>
      );
   }

   const placeholderCount = Math.max(0, 20 - projectsData.items.length);
   const placeholders = Array.from({ length: placeholderCount }, (_, i) => (
      <TabListPlaceholderTab key={i} />
   ));

   const projectTabs = projectsData.items.map((project) => {
      return <ProjectTab project={project} key={project.id} />;
   });

   // Build the list: real projects, add button, then placeholders
   const projectListItems = [
      projectTabs,
      <TabListAddButton addFn={handleNewProject} key="add-project-tab">
         Add New Project
      </TabListAddButton>,
      placeholders,
   ];

   console.log('projectListItems', projectListItems)

   // load more button logic
   const remainingItems = projectsData.total - projectsData.items.length > 0;
   const loadMoreProject = () => {
      const newAmount = projectsData.total + 16;
      handleLoadMore(newAmount);
   };

   return (
      <>
         <ScrollArea className="w-full h-full z-10">
            <div className={cn('flex flex-col gap-1 box-border')}>
               {projectListItems}
            </div>
         </ScrollArea>
         {remainingItems && (
            <div className="flex justify-center pb-5 pt-1 w-full">
               <LoadMoreButton
                  loadMoreFn={loadMoreProject}
                  isLoading={isFetching}
               />
            </div>
         )}
      </>
   );
};

const ProjectTab: React.FC<{ project: ProjectFindManyItem }> = ({
   project,
}) => {
   const navigate = useNavigate();
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const formattedDateModified = formatDate(project.updatedAt!, 'LONG');

   const openSettingDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'allProjectsPage',
         type: 'projectSettings',
         entity: 'project',
         data: project,
      });
   };

   const handleProjectNavigation = () => {
      navigate(`${project.id}`);
   };

   return (
      <div
         onClick={handleProjectNavigation}
         style={{
            backgroundColor: `var(--freelanceman-theme-${project.client?.themeColor})`,
            borderColor: `var(--freelanceman-theme-${project.client?.themeColor})`,
         }}
         className={`flex rounded-[15px] h-[40px] relative transition-colors
                     hover:border-primary  group overflow-hidden cursor-default`}
      >
         <div className="z-10 flex items-center px-3 justify-between w-full text-constant-primary">
            <p className="font-medium text-md cursor-default line-clamp-1">
               {project.name}
            </p>
            <div className="flex items-center gap-2 text-constant-primary shrink-0 opacity-50 sm:hidden">
               <FolderClock className="w-4 h-4" />
               <p>{formattedDateModified}</p>
            </div>
         </div>
         <div
            className="z-10 flex h-full items-center pr-1 text-constant-primary opacity-50 hover:opacity-100 cursor-pointer"
            onClick={(e) => openSettingDialog(e)}
         >
            <EllipsisVertical className="w-5 h-5" />
         </div>
         <div className="absolute opacity-10 group-hover:opacity-50 w-full h-full bg-gradient-to-r from-white to-transparent transition-opacity"></div>
      </div>
   );
};

export default ProjectList;
