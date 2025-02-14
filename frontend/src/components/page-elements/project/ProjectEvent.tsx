import { useAllEventQuery } from '@/lib/api/event-api';
import { EventSearchOption, Project } from '@types';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/components/shared/ui/AddButton';
import { EventList } from '@/components/page-elements/actions/EventList';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultEventValues } from 'src/components/shared/ui/helpers/constants/default-values';

const ProjectEvent: React.FC<{project: Project}> = ({project}) => {
   const setFormDialogState = useDialogStore((state) => state.setFormDialogState);
   const handleNewEvent = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'project-page',
         type: 'event',
         data: defaultEventValues
      })
   }

   const [eventFilter, setEventFilter] = useState<EventSearchOption>({
      projectId: project.id
   });

   const { data: eventsData, isLoading } = useAllEventQuery(eventFilter);

   return (
      <div className="flex flex-col w-1/2">
         <div className='flex justify-between items-center pl-3 pr-2'>
            <p className="flex items-center h-9 text-md gap-1">
               <Calendar className="w-4 h-4" style={{
                  color: project.themeColor
               }} />
               Event
            </p>
            <AddButton onClick={handleNewEvent} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow">
            <EventList
               isLoading={isLoading}
               eventsData={eventsData}
            />
         </div>
      </div>
   );
};

export default ProjectEvent;
