import { useNavigate } from 'react-router-dom';
import type { ProjectPayload } from 'freelanceman-common/src/schemas';
import { CircleCheck, EllipsisVertical, UsersRound } from 'lucide-react';
import {
   ProjectListProps,
   ProjectCardProps,
   QuickTaskBubbleProps,
} from '@/components/page-elements/all-projects/props.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AllProjectPageLoader from '@/components/shared/ui/placeholder-ui/AllProjectPageLoader';
import {
   ApiErrorPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholders/ListPlaceHolder';
import {
   defaultNewProjectValue,
} from '@/components/shared/ui/helpers/constants/default-values';

const ProjectGrid: React.FC<ProjectListProps> = ({ queryResult }) => {
   const { data: projects, isLoading, isError, refetch } = queryResult;

   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const handleNewProject = () => {
      setFormDialogState({
         isOpen: true,
         type: 'new-project',
         mode: 'create',
         data: { ...defaultNewProjectValue },
         openedOn: 'global-add-button',
         entity: 'project',
      });
   };

   if (isLoading) return <AllProjectPageLoader />;
   if (isError || !projects) return <ApiErrorPlaceHolder retryFn={refetch} />;
   if (!projects.items.length)
      return (
         <NoDataPlaceHolder addFn={handleNewProject} className="h-full">
            Get started by adding a new project
         </NoDataPlaceHolder>
      );
   const projectCards =
      projects.items.length !== 0
         ? projects.items.map((project: ProjectPayload) => {
              return <ProjectCard project={project} key={project.id} />;
           })
         : 'no content';

   return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3 w-full">
         {projectCards}
      </div>
   );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const navigate = useNavigate();

   console.log('project', project.tasks)

   const openSettingDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'all-project-page',
         type: 'project-settings',
         entity: 'project',
         data: project,
      });
   };

   const handleProjectNavigation = () => {
      navigate(`${project.id}`);
   };

   const handleClientNavigation = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate(`../client/${project.clientId}`);
   };

   return (
      <div
         className={`
         relative flex flex-col justify-between rounded-[20px] overflow-hidden group
         h-[205px] leading-tight transition-all border text-constant-primary
         duration-75 shadow-md max-w-[400px]
         `}
         style={{
            borderColor: `var(--freelanceman-theme-${project.client.themeColor})`,
         }}
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
               className={`
                  flex items-center gap-[5px] w-fit cursor-pointer opacity-30
                  hover:opacity-100 transition-opacity duration-100`}
               onClick={(e) => {
                  handleClientNavigation(e);
               }}
            >
               <UsersRound className="w-[17px]" />
               <p>{project.client.name}</p>
            </div>
            <p className="text-[20px] line-clamp-3 cursor-default text-constant-primary">
               {project.title}
            </p>
         </div>
         <QuickTaskBubble
            projectStatus={project.projectStatus}
            task={project.tasks[0]}
         />
         <div
            className={`absolute inset-0 transition-opacity bg-theme-${project.client.themeColor}`}
         />
         <div
            className={`absolute inset-0 opacity-35 group-hover:opacity-75
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
         openedOn: 'all-project-page',
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
               rounded-full h-[30px] z-10 cursor-pointer text-primary
            `}
            onClick={handleClick}
         >
            <CircleCheck className="h-[20px] w-auto" />
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
