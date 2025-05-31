import SideBar from '@/components/page-elements/app-layout/sidebar/SideBar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import FormDialog from 'src/components/shared/ui/dialogs/form-dialog/FormDialog';
import SelectorDialog from 'src/components/shared/ui/dialogs/selector-dialog/SelectorDialog';
import ConfirmationDialog from 'src/components/shared/ui/dialogs/ConfirmationDialog/ConfirmationDialog';
import { Toaster } from '@/components/shared/ui/primitives/Toaster';
import { GreetingDialog } from '@/components/shared/ui/dialogs/welcome-dialog/WelcomeDialog';
import { UserBar } from '@/components/page-elements/app-layout/sidebar/UserBar';
import GlobalAddButton from '@/components/page-elements/app-layout/sidebar/GlobalAddButton';
import { FreelanceManTypo } from '@/components/shared/icons';
import { UseQueryResult } from '@tanstack/react-query';
import { EventListPayload } from 'freelanceman-common';
import {
   AlignJustify,
   BookUser,
   Calendar,
   CircleCheck,
   Folder,
   Layers,
   Loader2,
   SquareMenu,
   UserRound,
   UsersRound,
   Wallet,
} from 'lucide-react';
import { useEventsQuery } from '@/lib/api/event-api';
import { useTasksQuery } from '@/lib/api/task-api';
import { cn } from '@/lib/helper/utils';
import { format } from 'date-fns';
import { MenuPopover } from '@/components/page-elements/app-layout/MenuPopover';

export default function HomePage() {
   return (
      <div
         className={`bg-background w-auto h-screen flex overflow-hidden relative p-3
                     sm:flex-col sm:p-0
                  `}
      >
         <div
            className={`flex w-[180px] gap-4 shrink-0 mr-3
                        md:flex-col md:w-[65px] 
                        lg:flex-col 
                        sm:w-full sm:p-3 sm:items-center
                     `}
         >
            <div className='flex justify-center gap-2 lg:flex-col sm:gap-1'>
               <div className="px-3 pt-3 pb-2 md:hidden rounded-xl sm:order-2 sm:p-1 box-border">
                  <FreelanceManTypo className="h-auto w-full sm:h-full sm:w-auto" />
               </div>
               <UserBar />
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-fit md:gap-3">
               <CountDisplayBar />
               <SideBar />
            </div>
            <div
               className={cn(
                  'flex justify-center gap-2 items-end w-full pb-3 shrink-0 grow',
                  'sm:pb-0 sm:w-fit sm:justify-end sm:items-center',
               )}
            >
               <MenuPopover />
               <GlobalAddButton />
            </div>
         </div>
         <main className="flex flex-col flex-grow min-h-0 relative sm:px-3 sm:pb-3">
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

const CountDisplayBar = () => {
   const date = new Date().toISOString();
   const formattedDate = format(date, 'dd MMM').toUpperCase();
   const eventQueryResult = useEventsQuery({ status: 'scheduled' });
   const taskQueryResult = useTasksQuery({ status: 'pending' });
   return (
      <div
         className={cn(
            'flex cursor-default justify-between text-secondary text-md w-full rounded-xl px-3 py-1 border-2 border-tertiary',
            'md:flex-col md:py-3 md:pb-2 md:gap-3 sm:hidden'
         )}
      >
         <p className="text-nowrap md:hidden">{formattedDate}</p>
         <CountDisplay
            label="Task"
            icon={CircleCheck}
            queryResult={taskQueryResult}
         />
         <CountDisplay
            label="Event"
            icon={Calendar}
            queryResult={eventQueryResult}
         />
      </div>
   );
};

const CountDisplay = ({
   queryResult,
   icon: Icon,
   label,
   className,
}: {
   queryResult: UseQueryResult<EventListPayload>;
   icon: React.ElementType;
   label: string;
   className?: string;
}) => {
   const { data, isLoading } = queryResult;
   const navigate = useNavigate();

   if (isLoading) {
      return <Loader2 className="animate-spin h-5 w-5" />;
   }

   return (
      <p
         onClick={() => navigate('/home/actions')}
         className={cn(
            'flex gap-1 items-center select-none cursor-pointer hover:text-primary transition-colors duration-100',
            'md:flex-col md:gap-0',
            className
         )}
      >
         <Icon className={cn('h-5 w-5', 'md:w-7 md:h-7')} />
         <span className={cn('md:text-[20px]')}>
            {data?.items?.length || '0'}
         </span>
         {/* <span className='text-sm'>{(data?.items?.length || 0) <= 1 ? label : `${label}s`}</span> */}
      </p>
   );
};
