import { useAllEventQuery } from '@/lib/api/event-api';
import { FormDialogState } from '@/lib/types/dialog.types';
import { EventSearchOptions } from '@types';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { ProjectEventList } from '@/components/page-elements/project/ProjectEventList';
import AddButton from '@/components/shared/ui/AddButton';
import EventDialog from '@/components/shared/ui/EventDialog';

const ProjectEvent: React.FC = () => {
   const [eventDialogState, setEventDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'event',
      data: {},
   });

   const [eventFilter, setEventFilter] = useState<EventSearchOptions>({
      clientId: 'a1e45f22-5d78-4b2a-a24d-8c19ea5f3ef7',
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: eventsData, isLoading } = useAllEventQuery(eventFilter);

   return (
      <div className="flex flex-col w-1/2">
         <div className="flex items-center justify-between pl-4 pr-3 h-11 text-lg cursor-default my-1">
            <p className="flex items-center gap-1 text-primary transition-colors duration-150">
               <Calendar className="w-5 h-5" />
               Event
            </p>
            <AddButton />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow">
            <ProjectEventList
               isLoading={isLoading}
               setDialogState={setEventDialogState}
               eventsData={eventsData}
            />
         </div>
         <EventDialog
            dialogState={eventDialogState}
            setDialogState={setEventDialogState}
         />
      </div>
   );
};

export default ProjectEvent;
