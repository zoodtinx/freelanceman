import SideBar from '@/components/page-elements/app-layout/sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import FormDialog from 'src/components/shared/ui/dialogs/form-dialog/FormDialog';
import SelectorDialog from 'src/components/shared/ui/dialogs/selector-dialog/SelectorDialog';
import ConfirmationDialog from 'src/components/shared/ui/dialogs/ConfirmationDialog/ConfirmationDialog';
import { Toaster } from '@/components/shared/ui/primitives/Toaster';
import { GreetingDialog } from '@/components/shared/ui/dialogs/greeting-dialog/GreetingDialog';
import { UserBar } from '@/components/page-elements/app-layout/sidebar/UserBar';
import GlobalAddButton from '@/components/page-elements/app-layout/sidebar/GlobalAddButton';
import { FreelanceManTypo } from '@/components/shared/icons';

export default function HomePage() {
   return (
      <div className="bg-background w-auto h-screen flex overflow-hidden relative p-3 ">
         <div className="flex flex-col w-[180px] md:w-fit gap-4 shrink-0 mr-3">
            <div className="px-3 pt-3 pb-1 md:hidden">
               <FreelanceManTypo className="w-full h-auto" />
            </div>
            <UserBar />
            <SideBar />
            <div className="flex flex-col grow justify-end gap-5 items-center w-full pb-3 shrink-0">
               <GlobalAddButton />
            </div>
         </div>
         <main className="flex flex-col flex-grow min-h-0 relative">
            <Outlet />
         </main>
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
