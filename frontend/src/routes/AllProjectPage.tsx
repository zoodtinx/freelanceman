import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useAllProjectsQuery, useProjectsQuery } from '@/lib/api/project-api';
import ProjectList from '@/components/page-elements/all-projects/ProjectList';
import ProjectGrid from '@/components/page-elements/all-projects/ProjectGrid';
import { ProjectFilterBar } from '@/components/page-elements/all-projects/ProjectFilterBar';
import { useNavigate } from 'react-router-dom';
import { ProjectFilterDto } from '@schemas';

export default function AllProjectPage() {
   const { theme } = useTheme();
   const navigate = useNavigate();

   useEffect(() => {
      const htmlClass = document.documentElement.className;
      console.log('HTML class after theme is applied:', htmlClass);
      const prefersDarkMode = window.matchMedia(
         '(prefers-color-scheme: dark)'
      ).matches;
      console.log('Prefers dark mode:', prefersDarkMode ? 'dark' : 'light');
   }, [theme]);

   const [projectFilter, setProjectFilter] = useState<ProjectFilterDto>({
      projectStatus: 'active',
   });

   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   const projectsQueryResult = useProjectsQuery(projectFilter);

   const { isError, error } = projectsQueryResult;

   if (isError && error.message === 'Unauthorized') {
      navigate('/login');
      return;
   }

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
