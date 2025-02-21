import { useTaskQuery } from '@/lib/api/task-api';
import { useNavigate } from 'react-router-dom';
import type { Project } from '@types';
import { CircleCheck, EllipsisVertical, UsersRound } from 'lucide-react';
import {
   ProjectListProps,
   ProjectCardProps,
   QuickTaskBubbleProps,
} from '@/components/page-elements/all-projects/props.type';
import useDialogStore from '@/lib/zustand/dialog-store';

const ProjectGrid: React.FC<ProjectListProps> = ({ projects, isLoading }) => {
   if (isLoading) {
      return <p>Loading</p>;
   }

   if (!projects || projects.length === 0) {
      return <p>Get started by creating a new project</p>;
   }

   const projectCards =
      projects.length !== 0
         ? projects.map((project: Project) => {
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
   const setFormDialogState = useDialogStore(
      (state) => state.setFormDialogState
   );

   const { data: quickTask, isLoading } = useTaskQuery(project.quickTaskId);
   const navigate = useNavigate();

   if (isLoading) {
      return null;
   }

   const openSettingDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFormDialogState({
         isOpen: true,
         mode: 'view',
         openedOn: 'all-project-page',
         type: 'project-settings',
         data: project,
      });
   };

   const openTaskDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFormDialogState({
         isOpen: true,
         mode: 'view',
         openedOn: 'all-project-page',
         type: 'task',
         data: quickTask,
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
         h-[205px] leading-tight transition-all text-freelanceman-darkgrey border
         duration-75 shadow-md max-w-[400px]
         `}
         style={{
            borderColor: `var(--freelanceman-theme-${project.themeColor})`,
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
                  flex items-center gap-[5px] w-fit cursor-pointer
                  hover:opacity-100 transition-opacity duration-100`}
               onClick={(e) => {
                  handleClientNavigation(e);
               }}
            >
               <UsersRound className="w-[17px]" />
               <p className=''>{project.client}</p>
            </div>
            <p className="text-[20px] line-clamp-3 cursor-default text-constant-primary">
               {project.title}
            </p>
         </div>
         <QuickTaskBubble
            projectStatus={project.projectStatus}
            task={quickTask}
         />
         <div
            className={`absolute inset-0 transition-opacity bg-theme-${project.themeColor}`}
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
   const isActive = task.dueAt && new Date(task.dueAt) > new Date();
   const handleClick = () => {
      //open task dialog
   };

   if (isActive) {
      return (
         <div
            className={`
               flex gap-1 pl-1 pr-2 m-3 items-center bg-foreground dark:bg-background 
               rounded-full h-[30px] z-10 cursor-pointer
            `}
            onClick={handleClick}
         >
            <CircleCheck className=" h-[20px] w-auto" />
            <p className=" truncate">{task.name}</p>
         </div>
      );
   } else if (!isActive && projectStatus === 'completed') {
      return (
         <div
            className={`
            flex gap-1 pl-1 pr-2 m-3 items-center bg-foreground dark:bg-background text-secondary
            rounded-full h-[30px] z-10 cursor-pointer
         `}
         >
            <CircleCheck className=" h-[20px] w-auto" />
            <p className=" truncate">Project is completed</p>
         </div>
      );
   } else {
      return (
         <div
            className={`
            flex gap-1 pl-1 pr-2 m-3 items-center bg-foreground dark:bg-background text-secondary
            rounded-full h-[30px] z-10 cursor-pointer
         `}
         >
            <CircleCheck className=" h-[20px] w-auto" />
            <p className=" truncate">No active task</p>
         </div>
      );
   }
};

export default ProjectGrid;
