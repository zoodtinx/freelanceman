import { useNavigate } from 'react-router-dom';
import { CircleCheck, EllipsisVertical, UsersRound } from 'lucide-react';
import {
   ProjectListProps,
   ProjectCardProps,
   QuickTaskBubbleProps,
} from '@/components/page-elements/all-projects/props.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AllProjectPageLoader from '@/components/shared/ui/placeholder-ui/AllProjectPageLoader';
import { ApiErrorPlaceHolder } from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { defaultNewProjectValue } from '@/components/shared/ui/helpers/constants/default-values';
import NoProjectPlaceholder from '@/components/shared/ui/placeholder-ui/AllProjectPagePlaceHolder';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import {
   ScrollArea
} from '@/components/shared/ui/primitives/ScrollArea';
import { cn } from '@/lib/helper/utils';
import SearchNotFoundPlaceholder from '@/components/shared/ui/placeholder-ui/SearchNotFoundPlaceHolder';

const ProjectGrid: React.FC<ProjectListProps> = ({
   queryResult,
   handleLoadMore,
}) => {
   const { data: projects, isLoading, isFetching, isError, refetch } = queryResult;

   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const handleNewProject = () => {
      setFormDialogState({
         isOpen: true,
         type: 'newProject',
         mode: 'create',
         data: { ...defaultNewProjectValue },
         openedOn: 'globalAddButton',
         entity: 'project',
      });
   };

   console.log('isLoading', isLoading)

   if (isLoading) return <AllProjectPageLoader />;
   if (isError || !projects) return <ApiErrorPlaceHolder retryFn={refetch} />;
   if (projects?.total === 0) {
      if (projects.unfilteredTotal === 0) {
         return <NoProjectPlaceholder addFn={handleNewProject} />;
      }
      return <SearchNotFoundPlaceholder>No project matched your search.</SearchNotFoundPlaceholder>;
   }

   const placeholdersNeeded = Math.max(0, 4 - projects.items.length);

   const placeholders = Array.from({ length: placeholdersNeeded }, (_, i) => ({
      id: `placeholder-${i}`,
      isPlaceholder: true,
   }));

   const filledProjects = [...projects.items, ...placeholders];

   const projectCards = filledProjects.map((project: any) =>
      project.isPlaceholder ? (
         <div key={project.id} />
      ) : (
         <ProjectCard project={project} key={project.id} />
      )
   );

   const remainingItems = projects.total - projects.items.length > 0;

   const loadMoreProject = () => {
      const newAmount = projects.total + 16;
      handleLoadMore(newAmount);
   };

   return (
      <>
         <ScrollArea className="h-full z-10">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-[repeat(4,minmax(0,1fr))] gap-3 w-full pb-4 pl-1 pt-1 pr-1">
               {projectCards}
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

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const navigate = useNavigate();

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

   const handleClientNavigation = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (project.clientId) {
         navigate(`../clients/${project.clientId}`);
      }
   };

   return (
      <div
         className={`
         relative flex flex-col justify-between rounded-[20px] overflow-hidden group
         h-[205px] leading-tight transition-all text-constant-primary
         duration-75 shadow-md max-w-[400px]
         `}
         onClick={handleProjectNavigation}
      >
         <EllipsisVertical
            className="absolute opacity-30 hover:opacity-100 right-2 top-3 z-20 w-[20px] cursor-pointer transition-opacity duration-100"
            onClick={(e) => {
               openSettingDialog(e);
            }}
         />
         <div className="z-10 p-3 px-4">
            <div
               className={cn(`
                  flex items-center gap-[5px] w-fit cursor-pointer opacity-30
                  hover:opacity-100 transition-opacity duration-100`,
               !project.clientId && 'cursor-default')}
               onClick={(e) => {
                  handleClientNavigation(e);
               }}
            >
               <UsersRound className="w-[17px]" />
               <p>{project.client?.name ?? 'Freelancing'}</p>
            </div>
            <p className="text-[20px] line-clamp-3 cursor-default text-constant-primary">
               {project.name}
            </p>
         </div>
         <QuickTaskBubble
            projectStatus={project.projectStatus}
            task={project.tasks[0]}
         />
         <div
            className={cn(
               `absolute inset-0 transition-opacity`,
               project.client?.themeColor ?
                  `bg-theme-${project.client.themeColor}` : `bg-theme-grey`
            )}
         />
         <div
            className={`absolute inset-0 opacity-30 group-hover:opacity-60
            bg-gradient-to-b from-white to-transparent transition-opacity`}
         />
      </div>
   );
};

const QuickTaskBubble: React.FC<QuickTaskBubbleProps> = ({
   task,
   projectStatus,
}) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFormDialogState({
         isOpen: true,
         openedOn: 'allProjectsPage',
         mode: 'edit',
         type: 'task',
         entity: 'task',
         data: task,
      });
   };

   if (projectStatus === 'completed') {
      return (
         <div
            className={`
               flex gap-1 pl-1 pr-2 m-3 items-center bg-foreground dark:bg-background text-secondary
               rounded-full h-[30px] z-10 cursor-pointer
            `}
         >
            <CircleCheck className="h-[20px] w-auto" />
            <p className="truncate">Project is completed</p>
         </div>
      );
   }

   if (task) {
      return (
         <div
            className={`
               flex gap-1 pl-1 pr-2 m-3 items-center bg-foreground dark:bg-background
               rounded-full h-[28px] z-10 cursor-pointer text-primary
            `}
            onClick={handleClick}
         >
            <CircleCheck className="h-[20px] w-auto shrink-0" />
            <p className="truncate">{task.name}</p>
         </div>
      );
   }

   return (
      <div
         className={`
            flex gap-1 pl-1 pr-2 m-3 items-center bg-foreground dark:bg-background text-secondary
            rounded-full h-[30px] z-10 cursor-pointer
         `}
      >
         <CircleCheck className="h-[20px] w-auto" />
         <p className="truncate">No active task</p>
      </div>
   );
};

export default ProjectGrid;
