import { EllipsisVertical } from 'lucide-react';
import { useAllEventQuery } from '@/lib/api/event-api';
import { FormDialogState } from '@/lib/types/dialog.types';
import { EventSearchOptions, Project } from '@types';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { ProjectEventList } from '@/components/page-elements/project/ProjectEventList';
import AddButton from '@/components/shared/ui/AddButton';
import EventDialog from '@/components/shared/ui/EventDialog';

const ProjectEvent: React.FC<{project: Project}> = ({project}) => {
   const [eventDialogState, setEventDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'event',
      data: {},
      page: 'project-page'
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
         <div className='flex justify-between items-center pl-3 pr-2'>
            <p className="flex items-center h-9 text-md gap-1">
               <Calendar className="w-4 h-4" style={{
                  color: project.accentColor
               }} />
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
