import type { Project, ProjectStatus, PaymentStatus } from '@types';
import { useTranslation } from 'react-i18next';
import { Client } from '@/components/shared/icons';
import { Dots, Task, Cross } from '@/components/shared/icons';
import React, { useState, useRef } from 'react';
import { useProjectsViewContext } from '@/lib/context/ProjectsViewContext';
import ProjectSettingsDialog from './ProjectSettingsDialog';
import { useNavigate } from 'react-router-dom';
import type { ProjectPreview } from '@types';
import TaskDialog from '@/components/shared/ui/TaskDialog';

const ProjectGrid = () => {
   const {
      projects,
      isTaskDialogOpen,
      setIsTaskDialogOpen,
      isSettingsDialogOpen,
      setIsSettingsDialogOpen,
   } = useProjectsViewContext();

   const projectCards =
      projects.length !== 0
         ? projects.map((project: ProjectPreview) => {
              return <ProjectCard project={project} key={project.id} />;
           })
         : 'no content';

   return (
      <div className="grid grid-cols-4 md:grid-cols-4 gap-5 w-full">
         {projectCards}
         <ProjectSettingsDialog
            dialogueState={isSettingsDialogOpen}
            setDialogueState={setIsSettingsDialogOpen}
         />
         <TaskDialog
            dialogueState={isTaskDialogOpen}
            setDialogueState={setIsTaskDialogOpen}
         />
      </div>
   );
};

const ProjectCard: React.FC<{ project: ProjectPreview }> = ({
   project,
}) => {
   const { setIsSettingsDialogOpen, setIsTaskDialogOpen } =
      useProjectsViewContext();
   const { t } = useTranslation();

   const navigate = useNavigate();

   const openSettingDialog = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIsSettingsDialogOpen({
         isOpen: true,
         id: project.id,
      });
   };

   const openTaskDialog = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIsTaskDialogOpen({
         id: project.id,
         isOpen: true,
      });
   };

   const handleProjectNavigation = () => {
      navigate(`../${project.id}`);
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
            <p className="text-lg line-clamp-3 cursor-default">
               {project.name}
            </p>
         </div>
         <div
            className="flex gap-1 pl-1 pr-2 items-center bg-foreground dark:bg-background rounded-full h-[30px] z-10 cursor-pointer"
            onClick={(e) => {
               openTaskDialog(e);
            }}
         >
            <Task className="text-primary h-[22px] w-auto" />
            <p className="text-primary truncate">{project.quickTask}</p>
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
