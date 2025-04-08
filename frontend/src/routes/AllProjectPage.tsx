import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useAllProjectsQuery } from '@/lib/api/project-api';
import ProjectList from '@/components/page-elements/all-projects/ProjectList';
import ProjectGrid from '@/components/page-elements/all-projects/ProjectGrid';
import { ProjectFilterBar } from '@/components/page-elements/all-projects/ProjectFilterBar';
import { ProjectSearchOption } from '@types';

export default function AllProjectPage() {
   const { theme } = useTheme();

   useEffect(() => {
      const htmlClass = document.documentElement.className;
      console.log('HTML class after theme is applied:', htmlClass);
      const prefersDarkMode = window.matchMedia(
         '(prefers-color-scheme: dark)'
      ).matches;
      console.log('Prefers dark mode:', prefersDarkMode ? 'dark' : 'light');
   }, [theme]);

   const [projectFilter, setProjectFilter] = useState<ProjectSearchOption>({
      projectStatus: 'active',
   });

   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const { data: projects, isLoading } = useAllProjectsQuery(projectFilter);

   return (
      <div className="overflow-hidden flex flex-col flex-grow min-h-0 relative">
         <div className="flex flex-1 flex-col w-full sm:w-full overflow-y-auto min-h-0 relative">
         <div className="sticky top-0 z-20">
            <ProjectFilterBar
               projectFilter={projectFilter}
               setProjectFilter={setProjectFilter}
               viewMode={viewMode}
               setViewMode={setViewMode}
            />
         </div>
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
}
