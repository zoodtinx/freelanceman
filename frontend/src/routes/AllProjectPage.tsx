import { useState } from 'react';
import { useProjectsQuery } from '@/lib/api/project-api';
import ProjectGrid from '@/components/page-elements/all-projects/ProjectGrid';
import { ProjectFilterBar } from '@/components/page-elements/all-projects/ProjectFilterBar';
import { ProjectFilterDto } from 'freelanceman-common';
import ProjectList from '@/components/page-elements/all-projects/ProjectList';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import useAuthStore from '@/lib/zustand/auth-store';

export default function AllProjectPage() {
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      projectStatus: 'active',
   });

   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const projectsQueryResult = useProjectsQuery(projectFilter);
   const { isLoading, isError, refetch } = projectsQueryResult;

   const handleLoadMore = (value: number) => {
      setProjectFilter((prev) => {
         return {
            ...prev,
            take: value,
         };
      });
   };

   const { userData } = useAuthStore();
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   if (!userData?.visitingStatus?.homePage) {
      setWelcomeDialogState((prev) => {
         return { ...prev, isOpen: true };
      });
   }

   return (
      <div className="overflow-hidden flex flex-col flex-grow min-h-0 relative gap-2">
         <ProjectFilterBar
            projectFilter={projectFilter}
            setProjectFilter={setProjectFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
         />
         <div className="flex flex-1 flex-col sm:w-full  min-h-0 relative h-full">
            <div className="sm:hidden h-full">
               {viewMode === 'grid' && (
                  <ProjectGrid
                     queryResult={projectsQueryResult}
                     handleLoadMore={handleLoadMore}
                  />
               )}
               {viewMode === 'list' && (
                  <ProjectList
                     queryResult={projectsQueryResult}
                     handleLoadMore={handleLoadMore}
                  />
               )}
            </div>
            <div className="hidden sm:block w-full h-full">
               <ProjectList
                  queryResult={projectsQueryResult}
                  handleLoadMore={handleLoadMore}
                  placeHolder="Create a new project"
                  page="all-project-page"
               />
            </div>
         </div>
      </div>
   );
}
