import React, { useEffect } from 'react';
import ProjectList from './ProjectList';
import ProjectFilterBar from './ProjectFilterBar';
import { useProjectsViewContext } from '@/lib/helper/ProjectsViewContext';
import ProjectGrid from './ProjectGrid';
import { mockProjects } from '@/lib/mock/projects';

const ProjectsLayout: React.FC = () => {
   const { viewMode, setProjects } = useProjectsViewContext();

   setProjects(mockProjects);

   return (
      <section className="w-full h-full flex flex-col gap-1 sm:flex-col">
         <ProjectFilterBar />
         <div className="flex flex-1 flex-col w-full sm:w-full overflow-y-auto">
            <div className="sm:hidden">
               {viewMode === 'grid' && <ProjectGrid />}
               {viewMode === 'list' && <ProjectList />}
            </div>
            <div className="hidden sm:block">
               <ProjectList />
            </div>
         </div>
      </section>
   );
};

export default ProjectsLayout;