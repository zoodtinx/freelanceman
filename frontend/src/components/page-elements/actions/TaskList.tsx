import { Dispatch, SetStateAction } from 'react';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { FormDialogState } from '@/lib/types/dialog.types';
import type { Task } from '@types';
import { PencilLine } from 'lucide-react';
import { CheckedState } from '@radix-ui/react-checkbox';
import useDialogStore from '@/lib/zustand/dialog-store';

interface TaskListProps {
   tasksData: Task[] | undefined;
   isLoading: boolean;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export const TaskList: React.FC<TaskListProps> = ({
   tasksData,
   isLoading,
   setDialogState,
}) => {
   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (!tasksData || tasksData.length === 0) {
      return <p>No Task available</p>;
   }

   const fileListItems = tasksData.map((tasksData) => (
      <TaskListItem
         key={tasksData.id}
         data={tasksData}
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
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

const TaskListItem = ({ data, setDialogState }: TaskListItemProps) => {
   const setFormDialogState = useDialogStore((state) => state.setFormDialogState);
   
   const formattedDate = formatDate(data.dueAt, 'LONG');
   const formattedTime = formatTime(data.dueAt);

   const handleOpenDialog = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'view',
         openedOn: 'action-page',
         type: 'task',
         data: data
      })
   };

   const handleCheck = (checked: CheckedState) => {
      if (checked) {
         // this block is for marking as completd
         console.log(data.id, ' completed');
      } else {
         // this block is for undoing the task back to planned
         console.log(data.id, ' back to planned');
      }
   };

   return (
      <div className="grid grid-cols-[24px_auto] cursor-default">
         <div className="w-[24px] flex items-start pt-1">
            <Checkbox
               onCheckedChange={(checked) => handleCheck(checked)}
               className="h-[16px] w-[16px] shadow-none rounded-full opacity-100 mr-2 transition-all duration-150"
            />
         </div>
         <p onClick={handleOpenDialog}>{data.name}</p>
         <div></div>
         <div
            className="flex text-sm text-secondary"
            onClick={handleOpenDialog}
         >
            {formattedTime && <p className="w-[60px]">{formattedTime}</p>}
            <p className="w-fit">{formattedDate}</p>
         </div>
      </div>
   );
};
