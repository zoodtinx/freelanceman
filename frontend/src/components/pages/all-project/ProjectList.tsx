import type { Project } from '@types';
import { Dots } from '@/components/shared/icons';
import { useTranslation } from 'react-i18next';
import { useProjectsViewContext } from '@/lib/context/ProjectsViewContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// add edge case in case of empty projects list

const ProjectList = () => {
   const { projects } = useProjectsViewContext();

   const projectTabs = projects.map((project) => (
      <ProjectTab project={project} key={project.id} />
   ));

   return <div className="flex flex-col gap-2">{projectTabs}</div>;
};

const ProjectTab: React.FC<{ project: Project }> = ({ project }) => {
   const { t } = useTranslation();
   const navigate = useNavigate();

   const handleProjectNavigation = (e) => {
      console.log('first', first);
   };

   const handleClientNavigation = () => {
      console.log('first', first);
   };

   return (
      <div
         className="flex rounded-[15px] h-[40px] relative border-2 border-transparent hover:border-primary transition-colors"
         style={{ backgroundColor: project.color }}
         onClick={handleProjectNavigation}
      >
         <div className="z-10 flex items-center pl-3 pr-2 justify-between w-full text-[#333333]">
            <p className="font-medium max-w-[700px] text-md truncate cursor-default">
               {project.name}
            </p>

            <div className="flex grow items-center justify-end text-base text-primary">
               <p
                  className="w-fit text-right mr-8 cursor-pointer hover:opacity-60 transition-opacity"
                  onClick={handleClientNavigation}
               >
                  {project.client}
               </p>
               <p className="w-[170px]">
                  {t('startedAt')} :{' '}
                  {new Date(project.dateModified).toLocaleDateString()}
               </p>
               <Dots className="h-[20px] w-[18px]" />
            </div>
         </div>
         <div className="opacity-60 absolute rounded-[15px] inset-0 bg-gradient-to-l from-white to-transparent transition-opacity" />
      </div>
   );
};

export default ProjectList;
