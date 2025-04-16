import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { FormDialogState } from 'src/lib/types/form-dialog.types';
import { EllipsisVertical, PencilLine } from 'lucide-react';
import { EditPopover } from '@/components/shared/ui/EditPopover';
import { EventPayload } from 'freelanceman-common/src/schemas';

interface EventListProps {
   eventsData: Event[] | undefined;
   isLoading: boolean;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export const ProjectEventList: React.FC<EventListProps> = ({
   eventsData,
   isLoading,
   selectState = false,
   setDialogState,
   setSelectState,
}) => {
   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (!eventsData || eventsData.length === 0) {
      return <p>No Event available</p>;
   }

   const fileListItems = eventsData.map((eventsData) => (
      <EventListItem
         key={eventsData.id}
         data={eventsData}
         setSelectState={setSelectState}
         selectState={selectState}
         setDialogState={setDialogState}
      />
   ));

   return (
      <div className="flex flex-col h-0 grow overflow-y-auto">
         {fileListItems}
      </div>
   );
};

interface EventListItemProps {
   data: EventPayload;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   deleteFunction: () => void;
}

const EventListItem = ({
   data,
   selectState,
   setSelectState,
   setDialogState,
   deleteFunction,
}: EventListItemProps) => {
   const isSelected = selectState.selectedValues?.includes(data.id) || '';

   const formattedDate = formatDate(data.dueDate, 'LONG');
   const formattedTime = formatTime(data.dueDate);

   const handleOpenDialog = () => {
      setDialogState({
         isOpen: true,
         mode: 'view',
         type: 'event',
         data: data,
         id: data.id,
         page: 'project-page',
      });
   };

   const tags = ['Meeting', 'London', 'Mechanical', 'Robot'];

   return (
      <div className="flex border-b border-b-tertiary justify-between items-center pr-3 group">
         <div className="flex h-14  gap-2 shrink-0">
            <div className="flex items-center text-center leading-tight justify-center aspect-square h-full border-r border-r-tertiary bg-quaternary">
               5 <br />
               DEC
            </div>
            <div className="flex flex-col justify-center">
               <p>{data.name}</p>
               <div className="flex items-center">
                  <p className="text-sm text-secondary w-[54px]">
                     {formattedTime ? formattedTime : 'All day'}
                  </p>
                  <EventTags tags={tags} />
               </div>
            </div>
         </div>
         <PencilLine
            className={`w-5 h-5 stroke-[1.5px] text-secondary opacity-0 cursor-pointer
               group-hover:opacity-100 hover:text-primary
               transition-all duration-100
               `}
            onClick={handleOpenDialog}
         />
      </div>
   );
};

const EventTags = ({ tags }: { tags: string[] }) => {
   const eventsBubble = tags.map((tag) => {
      return (
         <p
            key={tag}
            className="text-sm py-0 px-2 border text-secondary rounded-full"
         >
            {tag}
         </p>
      );
   });

   return <div className="flex items-center gap-1">{eventsBubble}</div>;
};
