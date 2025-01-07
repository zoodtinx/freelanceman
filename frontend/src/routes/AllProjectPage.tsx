import { ProjectsViewProvider } from '@/lib/context/ProjectsViewContext';
import ProjectsLayout from 'src/components/page-elements/all-project/ProjectsLayout';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

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
   
   return (
      <ProjectsViewProvider>
         <ProjectsLayout />
      </ProjectsViewProvider>
   );
}
