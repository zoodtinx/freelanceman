import { cn } from '@/lib/helper/utils';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import EventSection from 'src/components/page-elements/actions/EventSection';
import TasksSection from 'src/components/page-elements/actions/TaskSection';

export default function ActionPage() {
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   // check if user has visited the page
   if (localStorage.getItem('actions') !== 'visited') {
      setWelcomeDialogState({ isOpen: true, page: 'actionsPage' });
   }

   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <div
            className={cn(
               'flex flex-col w-1/2 rounded-[20px] bg-foreground grow h-full shadow-md overflow-hidden',
               'sm:w-full sm:flex-1 sm:border sm:border-secondary sm:dark:border-tertiary'
            )}
         >
            <TasksSection />
         </div>
         <div
            className={cn(
               'flex flex-col w-1/2 rounded-[20px] bg-foreground grow h-full shadow-md overflow-hidden',
               'sm:w-full sm:flex-1 sm:border sm:border-secondary sm:dark:border-tertiary'
            )}
         >
            <EventSection />
         </div>
      </section>
   );
}
