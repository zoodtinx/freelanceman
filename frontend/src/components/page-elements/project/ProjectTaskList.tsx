import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { FormDialogState } from 'src/lib/types/form-dialog.types';
import type { Task } from '@types';
import { EllipsisVertical, PencilLine } from 'lucide-react';
import { EditPopover } from '@/components/shared/ui/EditPopover';

interface TaskListProps {
   tasksData: Task[] | undefined;
   isLoading: boolean;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export const ProjectTaskList: React.FC<TaskListProps> = ({
   tasksData,
   isLoading,
   selectState = false,
   setDialogState,
   setSelectState,
}) => {
   if (isLoading) {
      return <p>Loading...</p>;
   }

   console.log('tasksData', tasksData);

   if (!tasksData || tasksData.length === 0) {
      return <p>No Task available</p>;
   }

   const fileListItems = tasksData.map((tasksData) => (
      <TaskListItem
         key={tasksData.id}
         data={tasksData}
         setSelectState={setSelectState}
         selectState={selectState}
         setDialogState={setDialogState}
      />
   ));

   return (
      <div className="flex flex-col h-0 grow gap-3 overflow-y-auto">
         {fileListItems}
      </div>
   );
};

interface TaskListItemProps {
   data: Task;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   deleteFunction: () => void;
}

const TaskListItem = ({
   data,
   selectState,
   setSelectState,
   setDialogState,
   deleteFunction,
}: TaskListItemProps) => {
   const isSelected = selectState.selectedValues?.includes(data.id) || '';

   const formattedDate = formatDate(data.dueAt, 'LONG');
   const formattedTime = formatTime(data.dueAt);

   const handleOpenDialog = () => {
      setDialogState({
         isOpen: true,
         mode: 'view',
         type: 'event',
         data: data,
         id: data.id,
         page: 'project-page'
      });
   };

   return (
      <div className="flex justify-between items-center group pr-3">
         <div className="grid grid-cols-[24px_auto] px-[10px]">
            <div className="w-[24px] flex items-start pt-1">
               <Checkbox className="h-[16px] w-[16px] shadow-none rounded-full opacity-100 mr-2 transition-all duration-150" />
            </div>
            <p>{data.name}</p>
            <div></div>
            <div className="flex">
               {formattedTime && (
                  <p className="text-sm text-secondary w-[60px]">
                     {formattedTime}
                  </p>
               )}
               <p className="text-sm text-secondary w-fit">{formattedDate}</p>
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
