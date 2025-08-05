import { Calendar, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddButton from '@/components/shared/ui/AddButton';
import { EventList } from '@/components/shared/ui/lists/EventList';
import { defaultEventValues } from 'src/components/shared/ui/helpers/constants/default-values';
import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/primitives/ToggleGroup';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { EventFilterDto, ProjectFindOneResponse } from 'freelanceman-common';
import { useEventsQuery } from '@/lib/api/event-api';

const ProjectEventSection: React.FC<{ project: ProjectFindOneResponse }> = ({
   project,
}) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [eventFilter, setEventFilter] = useState<EventFilterDto>({
      projectId: project.id,
      status: 'scheduled',
   });

   const eventsQueryResult = useEventsQuery(eventFilter);
   const { isFetching } = eventsQueryResult;

   // refetch data if project changes but component stays mounted
   useEffect(() => {
      if (project?.id) {
         setEventFilter((prev: EventFilterDto) => ({
            ...prev,
            projectId: project.id,
         }));
      }
   }, [project?.id]);

   const handleNewEvent = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'projectPage',
         type: 'event',
         entity: 'event',
         data: { ...defaultEventValues, projectId: project.id },
      });
   };

   return (
      <div className="flex flex-col w-full">
         <div className="flex justify-between items-center pl-3 pr-2">
            <p className="flex items-center h-9 text-md gap-1 lg:font-normal">
               <Calendar className="w-4 h-4" />
               Event
            </p>
            <div className="flex gap-1">
               <ToggleGroup
                  type="single"
                  value={eventFilter.status as any}
                  onValueChange={(value: any) => {
                     if (value === eventFilter.status || !value) return;
                     setEventFilter((prev) => ({ ...prev, status: value }));
                  }}
               >
                  <ToggleGroupItem value="scheduled">Upcoming</ToggleGroupItem>
                  <ToggleGroupItem value="completed">Past</ToggleGroupItem>
               </ToggleGroup>
               {isFetching ? (
                  <div className="h-[33px] w-[33px] p-1">
                     <Loader2 className="w-full h-full sm:w-[22px] animate-spin" />
                  </div>
               ) : (
                  <AddButton onClick={handleNewEvent} />
               )}
            </div>
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow">
            <EventList
               addFn={handleNewEvent}
               filter={eventFilter}
               setFilter={setEventFilter}
               loader="spinner"
               page="projectPage"
               queryResult={eventsQueryResult}
            />
         </div>
      </div>
   );
};

export default ProjectEventSection;
