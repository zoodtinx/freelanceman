import { useEventsQuery } from '@/lib/api/event-api';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddButton from '@/components/shared/ui/AddButton';
import { EventList } from '@/components/page-elements/actions/EventList';
import { defaultEventValues } from 'src/components/shared/ui/helpers/constants/default-values';
import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/primitives/ToggleGroup';
import { EventFilterDto, ProjectPayload } from 'freelanceman-common';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

const ProjectEventSection: React.FC<{ project: ProjectPayload }> = ({ project }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const handleNewEvent = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'project-page',
         type: 'event',
         entity: 'event',
         data: {...defaultEventValues, projectId: project.id},
      });
   };

   const [eventFilter, setEventFilter] = useState<EventFilterDto>({
      projectId: project.id,
      status: 'scheduled'
   });

   useEffect(() => {
      if (project?.id) {
         setEventFilter((prev: EventFilterDto) => ({
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
                  value={eventFilter.status as any}
                  onValueChange={(value) => {
                     if (value) {
                       setEventFilter((prev) => ({ ...prev, status: value }));
                     }
                   }}
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
