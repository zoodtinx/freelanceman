import Events from '@/components/page-elements/actions/Events';
import Tasks from '@/components/page-elements/actions/Tasks';
import {
   ActionsViewProvider,
} from '@/lib/context/ActionsViewContext';

export default function ActionPage() {
   return (
      <ActionsViewProvider>
         <section className="w-full h-full flex gap-2 sm:flex-col">
            <div className="flex flex-col w-1/2 rounded-[20px] bg-foreground p-4 sm:w-full grow h-full shadow-md">
               <Tasks />
            </div>
            <div className="flex flex-col w-1/2 rounded-[20px] bg-foreground p-4 sm:w-full grow h-full shadow-md">
               <Events />
            </div>
         </section>
      </ActionsViewProvider>
   );
}
