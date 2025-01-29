import { cn } from '@/lib/helper/utils';
import { eventStatusSelections } from '@/components/shared/ui/selections';
import { useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import { NewActionButton } from '@/components/page-elements/actions/NewActionButton';
import EventDialog from '@/components/shared/ui/EventDialog';
import { useAllEventQuery, useDeleteEvent } from '@/lib/api/event-api';
import { eventDefaultValues } from 'src/components/shared/ui/constants';

import type { FormDialogState } from '@/lib/types/dialog.types';
import type { EventSearchOptions, EventStatus } from '@types';

import { EventList } from '@/components/page-elements/actions/EventList';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import MultiSelectButton from '@/components/shared/ui/MultiSelectButton';
import { EditPopover } from '@/components/shared/ui/EditPopover';

export default function Events() {
   const eventSectionRef = useRef<HTMLDivElement | undefined>();
   const [eventDialogState, setEventDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'event',
      data: eventDefaultValues,
   });

   const [eventFilter, setEventFilter] = useState<EventSearchOptions>({
      status: 'scheduled',
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: eventsData, isLoading } = useAllEventQuery(eventFilter);
   const { mutate: deleteFile, isPending } = useDeleteEvent();

   const setStatusFilter = (status: string) => {
      setEventFilter({ status: status as EventStatus });
   };

   const enableMultiSelect = () => {
      if (selectState.enableSelect) {
         return;
      }
      setSelectState({
         enableSelect: true,
         selectedValues: [],
      });
   };

   const selectAll = () => {
      if (!eventsData) {
         return;
      }
      setSelectState((prev) => {
         const selected = eventsData.map((event) => {
            return event.id;
         });
         return {
            ...prev,
            selectedValues: selected,
         };
      });
   };

   const handleStatusFilter = (value: any) => {
      setEventFilter((prev) => {
         return {
            ...prev,
            status: value,
         };
      });
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEventFilter((prev) => {
         return {
            ...prev,
            name: e.target.value,
         };
      });
   };

   return (
      <div className='flex flex-col grow'>
         <div className="flex w-full justify-between">
            <div className="flex items-end pb-3 gap-1">
               <Calendar className="w-[28px] h-auto" />
               <p className="text-xl leading-none mr-2">Events</p>
            </div>
            <NewActionButton
               type="event"
               setDialogState={setEventDialogState}
            />
         </div>
         <div className="flex gap-1 pt-1 pb-2">
            <div className="relative">
               <MultiSelectButton
                  enableMultiSelect={enableMultiSelect}
                  selectState={selectState}
                  setSelectState={setSelectState}
                  onDelete={deleteFile}
                  selectAllFn={selectAll}
                  ref={eventSectionRef}
               />
            </div>
            <FilterSelect
               onValueChange={handleStatusFilter}
               selectContents={eventStatusSelections}
               value={eventFilter.status}
               placeholder="Status"
               className={cn({ hidden: selectState.enableSelect })}
            />
            <SearchBox
               onChange={handleSearch}
               className={cn('border rounded-full h-[27px] w-[250px]', {
                  hidden: selectState.enableSelect,
               })}
            />
         </div>
         <EventList
            eventsData={eventsData}
            isLoading={isLoading}
            selectState={selectState}
            setSelectState={setSelectState}
            setDialogState={setEventDialogState}
         />
         <EventDialog
            dialogState={eventDialogState}
            setDialogState={setEventDialogState}
         />
      </div>
   );
}
