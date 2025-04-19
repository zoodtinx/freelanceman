import { useState } from 'react';
import { useProjectsQuery } from '@/lib/api/project-api';
import ProjectList from '@/components/page-elements/all-projects/ProjectList';
import ProjectGrid from '@/components/page-elements/all-projects/ProjectGrid';
import { ProjectFilterBar } from '@/components/page-elements/all-projects/ProjectFilterBar';
import { ProjectFilterDto } from 'freelanceman-common';
import AllProjectPageLoader from '@/components/shared/ui/placeholder-ui/AllProjectPageLoader';
import { UnexpectedError } from '@/components/shared/ui/placeholder-ui/ErrorUI';

export default function AllProjectPage() {
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      projectStatus: 'active',
   });

   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const projectsQueryResult = useProjectsQuery(projectFilter);
   const { isLoading, isError, refetch } = projectsQueryResult;

   if (isLoading) {
      return <AllProjectPageLoader />;
   }

   if (isError) {
      return <UnexpectedError onClick={() => refetch()} />;
   }

   return (
      <div className="overflow-hidden flex flex-col flex-grow min-h-0 relative">
         <ProjectFilterBar
            projectFilter={projectFilter}
            setProjectFilter={setProjectFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
         />
         <div className="flex flex-1 flex-col w-full sm:w-full overflow-y-auto min-h-0 relative h-full">
            <div className="sm:hidden h-full">
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
