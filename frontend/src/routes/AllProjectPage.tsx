import { useState } from 'react';
import { useProjectsQuery } from '@/lib/api/project-api';
import ProjectGrid from '@/components/page-elements/all-projects/ProjectGrid';
import { ProjectFilterBar } from '@/components/page-elements/all-projects/ProjectFilterBar';
import { ProjectFilterDto } from 'freelanceman-common';
import ProjectList from '@/components/page-elements/all-projects/ProjectList';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import { useUserQuery } from '@/lib/api/user-api';

export default function AllProjectPage() {
   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      projectStatus: 'active',
   });

   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const projectsQueryResult = useProjectsQuery(projectFilter);
   const { data: userData } = useUserQuery();

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

   if (userData?.visitingStatus?.homePage === false) {
      setWelcomeDialogState({ isOpen: true, page: 'homePage' });
   }

   return (
      <div className="overflow-hidden flex flex-col flex-grow min-h-0 relative gap-2 sm:w-full">
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
                     {projectsQueryResult.data?.total !== 0 &&
                        projectsQueryResult.data?.total <= 20 && (
                           <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-[repeat(4,minmax(0,1fr))] gap-3 w-full pb-4 pl-1 pt-1 pr-1 absolute top-0 z-0 sm:hidden">
                              {Array.from({ length: 30 }).map((_, i) => (
                                 <div
                                    key={i}
                                    className="border border-primary opacity-20 border-dashed rounded-[20px] max-w-[400px] h-[205px]"
                                 />
                              ))}
                           </div>
                        )}
                  </div>
               )}
               {viewMode === 'list' && (
                  <div className="relative w-full">
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
