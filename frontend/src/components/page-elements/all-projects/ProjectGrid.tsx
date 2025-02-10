import { useTaskQuery } from '@/lib/api/task-api';
import { useNavigate } from 'react-router-dom';
import type { Project } from '@types';
import { CircleCheck, EllipsisVertical, UsersRound } from 'lucide-react';
import { ProjectListProps, ProjectCardProps } from '@/components/page-elements/all-projects/props.type';

const ProjectGrid: React.FC<ProjectListProps> = ({
   projects,
   isLoading,
   setProjectSettingDialogState,
   setTaskDialogState
}) => {

   if (isLoading) {
      return <p>Loading</p>
   }

   if (!projects || projects.length === 0) {
      return <p>Get started by creating a new project</p>;
    }

   const projectCards =
      projects.length !== 0
         ? projects.map((project: Project) => {
              return (
                 <ProjectCard
                    project={project}
                    key={project.id}
                    setProjectSettingDialogState={setProjectSettingDialogState}
                    setTaskDialogState={setTaskDialogState}
                 />
              );
           })
         : 'no content';

   return (
      <div className="grid grid-cols-4 md:grid-cols-4 gap-3 w-full">
         {projectCards}
      </div>
   );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, setProjectSettingDialogState, setTaskDialogState }) => {
   const { data: quickTask, isLoading } = useTaskQuery(project.quickTaskId);
   const navigate = useNavigate();

   if (isLoading) {
      return null;
   }

   const openSettingDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      setProjectSettingDialogState({
         isOpen: true,
         id: project.id,
         data: {
            ...project,
         },
         mode: 'view',
         page: 'project-page',
         type: 'project-settings'
      });
   };

   const openTaskDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      setTaskDialogState({
         isOpen: true,
         id: quickTask.id,
         type: 'task',
         mode: 'view',
         page: 'project-page',
         data: {
            ...quickTask,
         },
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
         border-transparent hover:border-primary duration-75 shadow-md
         `}
         style={{
            borderColor: project.themeColor
         }}
         onClick={handleProjectNavigation}
      >
         <EllipsisVertical
            className="absolute opacity-30 hover:opacity-100 right-2 top-3 z-20 w-[20px] cursor-pointer "
            onClick={(e) => {
               openSettingDialog(e);
            }}
         />
         <div className="z-10 p-3 px-4">
            <div
               className={`
                  flex items-center gap-[5px] opacity-30 w-fit cursor-pointer
                  hover:opacity-100 transition-opacity duration-100`
               }
               onClick={(e) => {
                  handleClientNavigation(e);
               }}
            >
               <UsersRound className="w-[17px]" />
               <p>{project.client}</p>
            </div>
            <p className="text-[20px] line-clamp-3 cursor-default">
               {project.title}
            </p>
         </div>
         <div
            className={`
               flex gap-1 pl-1 pr-2 m-3 items-center bg-foreground dark:bg-background 
               rounded-full h-[30px] z-10 cursor-pointer
            `}
            onClick={(e) => {
               openTaskDialog(e);
            }}
         >
            <CircleCheck className="text-primary h-[20px] w-auto" />
            <p className="text-primary truncate">{quickTask}</p>
         </div>
         <div
            className="absolute inset-0 transition-opacity"
            style={{ backgroundColor: project.themeColor }}
         />
         <div
            className={`absolute inset-0 opacity-35 group-hover:opacity-75
            bg-gradient-to-b from-white to-transparent transition-opacity`}
         />
      </div>
   );
};

export default ProjectGrid;
