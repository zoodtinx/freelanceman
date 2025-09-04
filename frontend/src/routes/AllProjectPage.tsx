import { useEffect, useState } from 'react';
import { useProjectsQuery } from '@/lib/api/project-api';
import ProjectGrid from '@/components/page-elements/all-projects-page/ProjectGrid';
import { ProjectFilterBar } from '@/components/page-elements/all-projects-page/ProjectFilterBar';
import { ProjectFilterDto } from 'freelanceman-common';
import ProjectList from '@/components/page-elements/all-projects-page/ProjectList';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';

export default function AllProjectPage() {
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      projectStatus: 'active',
   });

   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const projectsQueryResult = useProjectsQuery(projectFilter);

   const handleLoadMore = (value: number) => {
      setProjectFilter((prev) => {
         return {
            ...prev,
            take: value,
         };
      });
   };

   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   // check if user has visited the page
   useEffect(() => {
      if (localStorage.getItem('home') !== 'visited') {
        setWelcomeDialogState({ isOpen: true, page: 'homePage' });
      }
    }, []);

   return (
      <div className="overflow-hidden flex flex-col flex-grow min-h-0 relative gap-2 sm:w-full sm:pt-0 p-2">
         <ProjectFilterBar
            projectFilter={projectFilter}
            setProjectFilter={setProjectFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
            isFetching={projectsQueryResult.isFetching}
         />
         <div className="flex flex-1 flex-col sm:w-full  min-h-0 relative h-full">
            <div className="sm:hidden h-full">
               {viewMode === 'grid' && (
                  <div className="relative w-full h-full">
                     <ProjectGrid
                        queryResult={projectsQueryResult}
                        handleLoadMore={handleLoadMore}
                     />
                  </div>
               )}
               {viewMode === 'list' && (
                  <div className="relative w-full h-full">
                     <ProjectList
                        queryResult={projectsQueryResult}
                        handleLoadMore={handleLoadMore}
                        page="allProjectPage"
                        clientId=""
                     />
                  </div>
               )}
            </div>
            <div className="hidden sm:block w-full h-full">
               <ProjectList
                  queryResult={projectsQueryResult}
                  handleLoadMore={handleLoadMore}
                  placeHolder="Create a new project"
                  page="allProjectPage"
                  clientId=""
               />
            </div>
         </div>
      </div>
   );
}
