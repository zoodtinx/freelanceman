import SideBar from '@/components/page-elements/app-layout/sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import FormDialog from 'src/components/shared/ui/dialogs/form-dialog/FormDialog';
import SelectorDialog from 'src/components/shared/ui/dialogs/selector-dialog/SelectorDialog';
import ConfirmationDialog from '@/components/shared/ui/dialogs/confirmation-dialog/ConfirmationDialog';
import { Toaster } from '@/components/shared/ui/primitives/Toaster';
import { GreetingDialog } from '@/components/shared/ui/dialogs/welcome-dialog/WelcomeDialog';
import { UserBar } from '@/components/page-elements/app-layout/sidebar/UserBar';
import GlobalAddButton from '@/components/page-elements/app-layout/sidebar/GlobalAddButton';
import { cn } from '@/lib/helper/utils';
import { format } from 'date-fns';
import { MenuPopover } from '@/components/page-elements/app-layout/MenuPopover';
import FreelanceMan2LineLogo from '@/components/shared/icons/FreelanceMan2Line';
import { useEffect } from 'react';

export default function HomePage() {
   // responsive design helper for mobile
   useEffect(() => {
      const setHeight = () => {
         document.documentElement.style.setProperty(
            '--vh',
            `${window.innerHeight * 0.01}px`
         );
      };
      setHeight();
      window.addEventListener('resize', setHeight);
      return () => window.removeEventListener('resize', setHeight);
   }, []);

   return (
      <div
         style={{ height: 'calc(var(--vh) * 100)' }}
         className={`bg-background w-full min-h-screen overflow-hidden relative
                     sm:p-0
                  `}
      >
         <div className='flex sm:flex-col max-w-[1600px] h-screen mx-auto'>
            <div
               className={`flex w-[145px] gap-2 shrink-0 mr-2 p-2 pr-0 pb-5
                        md:flex-col md:w-fit
                        lg:flex-col 
                        sm:w-full sm:p-3 sm:items-center
                     `}
            >
               <div className="flex justify-center gap-3 lg:flex-col sm:gap-1 md:pt-1">
                  <div className="pt-2 px-2 pb-2 md:hidden rounded-xl sm:order-2 sm:p-1 box-border w-fit">
                     <FreelanceMan2LineLogo className="h-auto w-full sm:h-full sm:w-auto" />
                  </div>
                  <UserBar />
               </div>
               <div className="flex flex-col gap-2 w-full sm:w-fit md:gap-3">
                  <CountDisplayBar />
                  <SideBar />
               </div>
               <div
                  className={cn(
                     'flex justify-center gap-1 items-end w-full shrink-0 grow',
                     'sm:pb-0 sm:w-fit sm:justify-end sm:items-center'
                  )}
               >
                  <MenuPopover />
                  <GlobalAddButton />
               </div>
            </div>
            <main className="flex flex-col flex-grow min-h-0 relative sm:px-3 sm:pb-3 p-2 pl-0">
               <Outlet />
            </main>
         </div>
         <GreetingDialog />
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

const CountDisplayBar = () => {
   const date = new Date().toISOString();
   const formattedDate = format(date, 'E dd MMM yyyy');

   return (
      <div
         className={cn(
            'flex cursor-default justify-center text-secondary text-md w-full rounded-xl px-3 py-[2px] border-2 border-tertiary',
            'md:flex-col md:py-3 md:pb-2 md:gap-3 sm:hidden md:hidden lg:hidden'
         )}
      >
         <p className="text-nowrap md:hidden">{formattedDate}</p>
      </div>
   );
};
