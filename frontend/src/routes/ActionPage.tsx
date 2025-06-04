import { useUserQuery } from '@/lib/api/user-api';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import EventSection from 'src/components/page-elements/actions/EventSection';
import TasksSection from 'src/components/page-elements/actions/TaskSection';

export default function ActionPage() {
   const { data: userData } = useUserQuery();
   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   if (userData?.visitingStatus?.actionsPage === false) {
      setWelcomeDialogState({ isOpen: true, page: 'actionsPage' });
   }

   return (
      <section className="w-full h-full flex gap-2 sm:flex-col">
         <div className="flex flex-col w-1/2 rounded-[20px] bg-foreground sm:w-full grow h-full shadow-md overflow-hidden sm:shadow-sm">
            <TasksSection />
         </div>
         <div className="flex flex-col w-1/2 rounded-[20px] bg-foreground sm:w-full grow h-full shadow-md overflow-hidden sm:shadow-sm">
            <EventSection />
         </div>
      </section>
   );
}
