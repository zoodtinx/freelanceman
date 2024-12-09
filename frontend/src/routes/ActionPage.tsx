import TaskTable from '@/components/pages/actions/TasksTable';
import Events from '@/components/pages/actions/Events';
import { ActionsViewProvider } from '@/lib/context/ActionsViewContext';

export default function ActionPage() {
   return (
      <ActionsViewProvider>
         <section className="w-full h-full flex gap-2 sm:flex-col">
            <div className="flex flex-col w-1/2 rounded-[30px] bg-foreground p-4 pt-5 sm:w-full grow h-full">
               <Events />
            </div>
            <div className="flex flex-col w-1/2 rounded-[30px] bg-foreground p-4 pt-5 sm:w-full grow h-full">
               <TaskTable />
            </div>
         </section>
      </ActionsViewProvider>
   );
}
