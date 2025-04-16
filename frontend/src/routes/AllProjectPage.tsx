import { useState } from 'react';
import { useProjectsQuery } from '@/lib/api/project-api';
import ProjectList from '@/components/page-elements/all-projects/ProjectList';
import ProjectGrid from '@/components/page-elements/all-projects/ProjectGrid';
import { ProjectFilterBar } from '@/components/page-elements/all-projects/ProjectFilterBar';
import { ProjectFilterDto } from 'freelanceman-common';

export default function AllProjectPage() {
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      projectStatus: 'active',
   });

   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const projectsQueryResult = useProjectsQuery(projectFilter);

   return (
      <div className="overflow-hidden flex flex-col flex-grow min-h-0 relative">
         <ProjectFilterBar
                  projectFilter={projectFilter}
                  setProjectFilter={setProjectFilter}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
               />
         <div className="flex flex-1 flex-col w-full sm:w-full overflow-y-auto min-h-0 relative">
            <div className="sm:hidden">
               {viewMode === 'grid' && (
                  <ProjectGrid queryResult={projectsQueryResult} />
               )}
               {viewMode === 'list' && (
                  <ProjectList queryResult={projectsQueryResult} />
               )}
            </div>
            <div className="hidden sm:block">
               <ProjectList queryResult={projectsQueryResult} />
            </div>
         </div>
      </div>
   );
}
