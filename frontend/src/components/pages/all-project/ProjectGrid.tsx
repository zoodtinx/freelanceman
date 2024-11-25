import type { Project, ProjectStatus, PaymentStatus } from '@types';
import { useTranslation } from 'react-i18next';
import { Client } from '@/components/shared/icons';
import { Dots, Task, Cross } from '@/components/shared/icons';
import React, { useState, useRef } from 'react';
import { useProjectsViewContext } from '@/lib/helper/ProjectsViewContext';
import ProjectSettingsDialog from './ProjectSettingsDialog';
import TaskDialogue from '@/components/shared/ui/TaskDialogue';


export default function ProjectGrid() {
   const { projects, isTaskDialogOpen, setIsTaskDialogOpen, isSettingsDialogOpen, setIsSettingsDialogOpen } = useProjectsViewContext();

   const projectCards =
      projects.length !== 0
         ? projects.map((project: Project) => {
              return (
                 <ProjectCardContainer project={project} key={project.id} />
              );
           })
         : 'no content';

   return (
      <div className="grid grid-cols-4 md:grid-cols-4 gap-5 w-full">
         {projectCards}
         <ProjectSettingsDialog dialogueState={isSettingsDialogOpen} setDialogueState={setIsSettingsDialogOpen} />
         <TaskDialogue dialogueState={isTaskDialogOpen} setDialogueState={setIsTaskDialogOpen} />
      </div>
   );
}


function ProjectCardContainer({
   project,
   openDialog,
}: {
   project: Project;
   openDialog: () => void;
}) {
   const { setDialogData, setIsSettingsDialogOpen } = useProjectsViewContext();
   const [settingMode, setSettingMode] = useState(false);

   return (
      <div className="relative flex flex-col justify-between rounded-[30px] h-[208.24px] p-4 pt-3 leading-tight transition-all text-[#333333]">

               <Dots
                  className="absolute opacity-30 hover:opacity-100 right-3 z-20 w-[17px] cursor-pointer"
                  onClick={() => {
                     setIsSettingsDialogOpen({
                        isOpen:true,
                        id: project.id
                     })
                  }}
               />
               <ProjectCardMain project={project} />
      </div>
   );
}


function ProjectCardMain({ project }: { project: Project }) {
   const { t } = useTranslation();
   const taskDialogueRef = useRef(null);
   const { setIsTaskDialogOpen, isTaskDialogOpen } = useProjectsViewContext();
   const viewTask = () => {
      taskDialogueRef?.current?.click();
   };

   const data = {
      client: 'Sansiri',
      dueDate: '2022-03-20T05:33:59.616611',
      details: `'Give youself a free time. you should define its type using either an interface or a type alias and provide it as a type parameter to your component's props. Here's an example'`,
      name: 'Revise - The Society press visit interary, Round 2',
      project: 'The Society Launch',
      status: 'planned',
      link: 'https://lucide.dev/icons/pencil',
   };

   const openTaskDialog = () => {
      setIsTaskDialogOpen({
         id: project.id,
         isOpen: true
      })
   }

   return (
      <>
         <div className="px-1 z-10">
            <div className="flex items-center gap-[5px] opacity-30 hover:opacity-95 w-fit cursor-pointer">
               <Client className="w-[20px]" />
               <p>{project.client}</p>
            </div>
            <p className="text-lg line-clamp-3">{project.name}</p>
         </div>
         <div
            className="flex gap-1 pl-1 pr-2 items-center bg-foreground dark:bg-background rounded-full h-[30px] z-10 cursor-pointer"
            onClick={openTaskDialog}
         >
            <Task className="text-primary h-[22px] w-auto" />
            <p className="text-primary  truncate">{project.tasks[0].name}</p>
         </div>
         <div
            className="absolute inset-0 rounded-[30px] transition-opacity"
            style={{ backgroundColor: project.color }}
         />
         <div className="opacity-60  absolute inset-0 bg-gradient-to-b from-white to-transparent rounded-[30px] transition-opacity" />
      </>
   );
}
