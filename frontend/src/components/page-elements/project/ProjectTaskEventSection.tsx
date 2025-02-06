import React from 'react';
import { Calendar, CircleCheck } from 'lucide-react';
import AddButton from '@/components/shared/ui/AddButton';
import { useState } from 'react';
import { cn } from '@/lib/helper/utils';
import { FormDialogState } from '@/lib/types/dialog.types';
import { EventSearchOptions } from '@types';
import { useAllEventQuery } from '@/lib/api/event-api';
import EventDialog from '@/components/shared/ui/EventDialog';

const ProjectTaskEventSection: React.FC = () => {

      const eventSectionRef = useRef<HTMLDivElement | undefined>();
      const [eventDialogState, setEventDialogState] = useState<FormDialogState>({
         isOpen: false,
         id: '',
         mode: 'view',
         type: 'event',
         data: {},
         page: 'project-page'
      });
   
      const [eventFilter, setEventFilter] = useState<EventSearchOptions>({
         status: 'scheduled',
      });
   
      const [selectState, setSelectState] = useState({
         enableSelect: false,
         selectedValues: [] as string[],
      });
   
      const { data: eventsData, isLoading } = useAllEventQuery(eventFilter);

   return (
      <>
         <div className="flex flex-1 items-center justify-between px-2 gap-3 h-11 text-lg cursor-default">
            <p
               className="flex items-center gap-1 text-primary transition-colors duration-150"
            >
               <CircleCheck className="w-5 h-5" />
               Task
            </p>
            <AddButton />
         </div>
         <div className='flex h-full py-2'>
            <div className='border-[0.5px]' />
         </div>
         <div className="flex flex-1 items-center justify-between px-2 gap-3 h-11 text-lg cursor-default">
            <p
               className="flex items-center gap-1 text-primary transition-colors duration-150"
            >
               <Calendar className="w-5 h-5" />
               Events
            </p>
            <AddButton />
         </div>
         <EventDialog dialogState={eventDialogState} setDialogState={setEventDialogState} />
      </>
   );
};

export default ProjectTaskEventSection;
