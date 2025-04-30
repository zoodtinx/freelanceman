import TopBar from '@/components/page-elements/app-layout/topbar/TopBar';
import SideBar from '@/components/page-elements/app-layout/sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import FormDialog from 'src/components/shared/ui/dialogs/form-dialog/FormDialog';
import SelectorDialog from 'src/components/shared/ui/dialogs/selector-dialog/SelectorDialog';
import ConfirmationDialog from 'src/components/shared/ui/dialogs/ConfirmationDialog/ConfirmationDialog';
import { Toaster } from '@/components/shared/ui/primitives/Toaster';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function HomePage() {
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
      <div className="bg-background w-auto h-screen flex flex-col sm:min-h-screen relative pt-1 pl-1">
         <TopBar />
         <main className="flex flex-grow min-h-0 px-2 pb-3 gap-2 sm:px-2 sm:pb-2 relative">
            <SideBar />
            <section className="flex-grow max-w-screen-lg w-full mx-auto min-h-0 flex pr-2 pb-2">
               <Outlet />
            </section>
         </main>
         <FormDialog />
         <SelectorDialog />
         <ConfirmationDialog />
         <Toaster position='bottom-center' duration={3000} />
      </div>
   );
}
