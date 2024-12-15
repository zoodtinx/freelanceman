import { ProjectsViewProvider } from '@/lib/context/ProjectsViewContext';
import ProjectsLayout from '@/components/pages/all-project/ProjectsLayout';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function AllProjectPage() {
   const { theme } = useTheme(); // Get the current theme from the context

   useEffect(() => {
      // Log the <html> class after the theme is applied
      const htmlClass = document.documentElement.className;
      console.log('HTML class after theme is applied:', htmlClass);
      const prefersDarkMode = window.matchMedia(
         '(prefers-color-scheme: dark)'
      ).matches;
      console.log('Prefers dark mode:', prefersDarkMode ? 'dark' : 'light');
   }, [theme]); // Run the effect whenever the theme changes
   return (
      <ProjectsViewProvider>
         <ProjectsLayout />
      </ProjectsViewProvider>
   );
}
