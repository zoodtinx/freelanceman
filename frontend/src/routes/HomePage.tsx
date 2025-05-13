import TopBar from '@/components/page-elements/app-layout/topbar/TopBar';
import SideBar from '@/components/page-elements/app-layout/sidebar/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import FormDialog from 'src/components/shared/ui/dialogs/form-dialog/FormDialog';
import SelectorDialog from 'src/components/shared/ui/dialogs/selector-dialog/SelectorDialog';
import ConfirmationDialog from 'src/components/shared/ui/dialogs/ConfirmationDialog/ConfirmationDialog';
import { Toaster } from '@/components/shared/ui/primitives/Toaster';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import useAuthStore from '@/lib/zustand/auth-store';
import {
   refreshAccess as apiRefreshAccess,
   checkAccess as apiCheckAccess,
} from '@/lib/api/auth-api';

export default function HomePage() {
   const { theme } = useTheme();
   const { accessToken, setAccessToken } = useAuthStore();
   const navigate = useNavigate();

   useEffect(() => {
      const htmlClass = document.documentElement.className;
      console.log('HTML class after theme is applied:', htmlClass);
      const prefersDarkMode = window.matchMedia(
         '(prefers-color-scheme: dark)'
      ).matches;
      console.log('Prefers dark mode:', prefersDarkMode ? 'dark' : 'light');
   }, [theme]);

   useEffect(() => {

      const refreshAccess = async () => {
         const result = await apiRefreshAccess();
         if (!result.success) {
            navigate('/login');
         }
         setAccessToken(result.data.newAccessToken);
      };

      const checkAccess = async () => {
         const result = await apiCheckAccess(accessToken);
         console.log('result', result);
         if (!result.success) {
            await refreshAccess();
         }
      };

      const init = async () => {
         await checkAccess();
      };
      
      const initByRefresh = async () => {
         await refreshAccess();
      };

      if (!accessToken) {
         initByRefresh()
      } else {
         init();
      }
   }, [accessToken]);

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
         <Toaster
            toastOptions={{
               classNames: {
                  toast: '!bg-primary !py-2 !pr-4 !pl-3 !rounded-xl !border-secondary',
                  title: '!text-foreground',
                  icon: '!text-foreground',
               },
            }}
            position="bottom-center"
            duration={3000}
         />
      </div>
   );
}
