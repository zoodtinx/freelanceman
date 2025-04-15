import React, { useState } from 'react';
import ProjectList from './ProjectList';
import { ProjectFilterBar } from './ProjectFilterBar';
import ProjectGrid from './ProjectGrid';
import { useProjectsQuery } from '@/lib/api/project-api';
import type { ProjectFilterDto } from '@schemas';

const ProjectsLayout: React.FC = () => {
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      projectStatus: 'active',
   });

   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const { data: projects, isLoading } = useProjectsQuery(projectFilter);

   return (
      <div className="overflow-hidden flex flex-col flex-grow min-h-0">
         <ProjectFilterBar
            projectFilter={projectFilter}
            setProjectFilter={setProjectFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
         />
         <div className="flex flex-1 flex-col w-full sm:w-full overflow-y-auto min-h-0">
            <div className="sm:hidden">
               {viewMode === 'grid' && (
                  <ProjectGrid projects={projects} isLoading={isLoading} />
               )}
               {viewMode === 'list' && (
                  <ProjectList projects={projects} isLoading={isLoading} />
               )}
            </div>
            <div className="hidden sm:block">
               <ProjectList projects={projects} isLoading={isLoading} />
            </div>
         </div>
      </div>
   );
};

export default ProjectsLayout;
