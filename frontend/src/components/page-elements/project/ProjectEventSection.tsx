import { Calendar } from 'lucide-react';
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

const ProjectEventSection: React.FC<{ project: ProjectFindOneResponse }> = ({
   project,
}) => {
   const [isFetching, setIsFetching] = useState(false)
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
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

   const [eventFilter, setEventFilter] = useState<EventFilterDto>({
      projectId: project.id,
      status: 'scheduled',
   });

   useEffect(() => {
      if (project?.id) {
         setEventFilter((prev: EventFilterDto) => ({
            ...prev,
            projectId: project.id,
         }));
      }
   }, [project?.id]);

   return (
      <div className="flex flex-col w-full">
         <div className="flex justify-between items-center pl-3 pr-2">
            <p className="flex items-center h-9 text-md gap-1">
               <Calendar className="w-4 h-4" />
               Event
            </p>
            <div className="flex gap-1">
               <ToggleGroup
                  type="single"
                  value={eventFilter.status as any}
                  onValueChange={(value) => {
                     if (value) {
                        setEventFilter((prev) => ({ ...prev, status: value as any }));
                     }
                  }}
               >
                  <ToggleGroupItem value="scheduled">Scheduled</ToggleGroupItem>
                  <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
                  <ToggleGroupItem value="cancelled">Cancelled</ToggleGroupItem>
               </ToggleGroup>
               <AddButton className="w-7 h-7" onClick={handleNewEvent} />
            </div>
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow">
            <EventList
               addFn={handleNewEvent}
               filter={eventFilter}
               setFilter={setEventFilter}
               loader='spinner'
               page='project-page'
               setIsFetching={setIsFetching}
            />
         </div>
      </div>
   );
};

export default ProjectEventSection;
