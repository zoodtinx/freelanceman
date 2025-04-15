import { useEventsQuery } from '@/lib/api/event-api';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddButton from '@/components/shared/ui/AddButton';
import { EventList } from '@/components/page-elements/actions/EventList';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultEventValues } from 'src/components/shared/ui/helpers/constants/default-values';
import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/primitives/ToggleGroup';

const ProjectEventSection: React.FC<{ project: Project }> = ({ project }) => {
   const setFormDialogState = useDialogStore(
      (state) => state.setFormDialogState
   );
   const handleNewEvent = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'project-page',
         type: 'event',
         data: defaultEventValues,
      });
   };

   const [eventFilter, setEventFilter] = useState<EventSearchOption>({
      projectId: project.id,
   });

   useEffect(() => {
      if (project?.id) {
         setEventFilter((prev: EventSearchOption) => ({
            ...prev,
            projectId: project.id,
         }));
      }
   }, [project?.id]);

   const { data: eventsData, isLoading } = useEventsQuery(eventFilter);

   return (
      <div className="flex flex-col w-full">
         <div className="flex justify-between items-center pl-3 pr-2">
            <p className="flex items-center h-9 text-md gap-1">
               <Calendar className="w-4 h-4" />
               Event
            </p>
            <div className='flex gap-1'>
               <ToggleGroup
                  type="single"
                  value={eventFilter.status}
                  onValueChange={(value) =>
                     setEventFilter((prev) => ({ ...prev, status: value }))
                  }
               >
                  <ToggleGroupItem value="scheduled">Scheduled</ToggleGroupItem>
                  <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
                  <ToggleGroupItem value="cancelled">Cancelled</ToggleGroupItem>
               </ToggleGroup>
               <AddButton onClick={handleNewEvent} />
            </div>
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow">
            <EventList isLoading={isLoading} eventsData={eventsData} />
         </div>
      </div>
   );
};

export default ProjectEventSection;
