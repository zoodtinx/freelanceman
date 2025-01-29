import { useTranslation } from 'react-i18next';
import { Client } from '@/components/shared/icons';
import { Dots, Task, Cross } from '@/components/shared/icons';
import React, { useState, useRef } from 'react';
import { useProjectsViewContext } from '@/lib/context/ProjectsViewContext';
import { useTaskQuery } from '@/lib/api/task-api';
import { useNavigate } from 'react-router-dom';
import type { Project, ProjectPreview } from '@types';

const ProjectGrid = () => {
   const { projects } = useProjectsViewContext();

   const projectCards =
      projects.length !== 0
         ? projects.map((project: Project) => {
              return <ProjectCard project={project} key={project.id} />;
           })
         : 'no content';

   return (
      <div className="grid grid-cols-4 md:grid-cols-4 gap-2 w-full">
         {projectCards}
      </div>
   );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
   const { data: quickTask, isLoading } = useTaskQuery(project.quickTaskId);
   const { setTaskDialogState, setProjectSettingDialogState } =
      useProjectsViewContext();
   const navigate = useNavigate();
   const { t } = useTranslation();

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
      });
   };

   const openTaskDialog = (e: React.MouseEvent) => {
      e.stopPropagation();
      setTaskDialogState({
         isOpen: true,
         id: quickTask.id,
         actionType: 'task',
         mode: 'view',
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
         className="relative flex flex-col justify-between rounded-[32px] h-[208.24px] p-4 pt-3 leading-tight transition-all text-[#333333] border-2 border-transparent hover:border-primary duration-75"
         onClick={handleProjectNavigation}
      >
         <Dots
            className="absolute opacity-30 hover:opacity-100 right-3 z-20 w-[17px] cursor-pointer"
            onClick={(e) => {
               openSettingDialog(e);
            }}
         />
         <div className="px-1 z-10">
            <div
               className="flex items-center gap-[5px] opacity-30 hover:opacity-95 w-fit cursor-pointer"
               onClick={(e) => {
                  handleClientNavigation(e);
               }}
            >
               <Client className="w-[20px]" />
               <p>{project.client}</p>
            </div>
            <p className="text-[20px] line-clamp-3 cursor-default">
               {project.title}
            </p>
         </div>
         <div
            className="flex gap-1 pl-1 pr-2 items-center bg-foreground dark:bg-background rounded-full h-[30px] z-10 cursor-pointer"
            onClick={(e) => {
               openTaskDialog(e);
            }}
         >
            <Task className="text-primary h-[22px] w-auto" />
            <p className="text-primary truncate">{quickTask.name}</p>
         </div>
         <div
            className="absolute inset-0 rounded-[30px] transition-opacity"
            style={{ backgroundColor: project.accentColor }}
         />
         <div className="opacity-60 absolute inset-0 bg-gradient-to-b from-white to-transparent rounded-[30px] transition-opacity" />
      </div>
   );
};

export default ProjectGrid;
