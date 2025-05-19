import { useState } from 'react';
import { useProjectsQuery } from '@/lib/api/project-api';
import ProjectList from '@/components/page-elements/all-projects/ProjectList';
import ProjectGrid from '@/components/page-elements/all-projects/ProjectGrid';
import { ProjectFilterBar } from '@/components/page-elements/all-projects/ProjectFilterBar';
import { ProjectFilterDto } from 'freelanceman-common';
import AllProjectPageLoader from '@/components/shared/ui/placeholder-ui/AllProjectPageLoader';
import { UnexpectedError } from '@/components/shared/ui/placeholder-ui/ErrorUI';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';

export default function AllProjectPage() {
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      projectStatus: 'active',
   });

   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const projectsQueryResult = useProjectsQuery(projectFilter);
   const { isLoading, isError, refetch } = projectsQueryResult;

   if (isLoading) {
      return <AllProjectPageLoader />
   }

   if (isError) {
      return <UnexpectedError onClick={() => refetch()} />;
   }

   const handleLoadMore = (value: number) => {
      setProjectFilter((prev) => {
         return {
            ...prev,
            take: value
         }
      })
   }

   return (
      <div className="overflow-hidden flex flex-col flex-grow min-h-0 relative gap-2">
         <ProjectFilterBar
            projectFilter={projectFilter}
            setProjectFilter={setProjectFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
         />
         <div className="flex flex-1 flex-col w-full sm:w-full  min-h-0 relative h-full">
            <div className="sm:hidden h-full">
               {viewMode === 'grid' && (
                  <ProjectGrid queryResult={projectsQueryResult} handleLoadMore={handleLoadMore} />
               )}
               {viewMode === 'list' && (
                  <ProjectList queryResult={projectsQueryResult} handleLoadMore={handleLoadMore} />
               )}
            </div>
            <div className="hidden sm:block">
               <ProjectList queryResult={projectsQueryResult} handleLoadMore={handleLoadMore} />
            </div>
         </div>
      </div>
   );
}
