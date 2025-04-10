import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { Task } from '@types';
import { CheckedState } from '@radix-ui/react-checkbox';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

interface TaskListProps {
   tasksData: Task[] | undefined;
   isLoading: boolean;
   page: 'action-page' | 'project-page';
}

export const TaskList: React.FC<TaskListProps> = ({
   tasksData,
   isLoading,
   page,
}) => {
   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (!tasksData || tasksData.length === 0) {
      return <p>No Task available</p>;
   }

   const taskListItems = tasksData.map((tasksData) => (
      <TaskListItem key={tasksData.id} data={tasksData} openedOn={page} />
   ));

   return (
      <div className="flex flex-col h-0 grow gap-1 overflow-y-auto">
         {taskListItems}
      </div>
   );
};

interface TaskListItemProps {
   data: Task;
   openedOn: 'action-page' | 'project-page';
}

const TaskListItem = ({ data, openedOn }: TaskListItemProps) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const formattedDate = formatDate(data.dueAt, 'LONG');
   const formattedTime = formatTime(data.dueAt);

   const handleOpenDialog = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: openedOn,
         type: 'task',
         data: data,
      });
   };

   const handleCheck = (checked: CheckedState) => {
      if (checked) {
         console.log(data.id, ' completed');
      } else {
         console.log(data.id, ' back to planned');
      }
   };

   return (
      <div className="grid grid-cols-[24px_auto] cursor-default hover:bg-background transition-colors duration-75 py-1 pl-2 rounded-lg">
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
