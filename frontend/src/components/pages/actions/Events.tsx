import EventsTable from './EventsTable';
import FilterBar from './FilterBar';
import { Plus } from '@/components/shared/icons';

export default function Events() {
   return (
      <>
         {/* <div className="flex items-center justify-between pb-3">
            <p className="text-xl leading-none">Upcoming Events</p>
            <div className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center">
               <Plus className="aspect-square h-[20px]" />
            </div>
         </div> */}
         <EventsTable />
      </>
   );
}
