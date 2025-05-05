import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import { TaskPayload } from 'freelanceman-common';
import { CheckedState } from '@radix-ui/react-checkbox';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useEditTask } from '@/lib/api/task-api';
import { X } from 'lucide-react';
import { cn } from '@/lib/helper/utils';

interface TaskListProps {
   tasksData: {
      tasks: TaskPayload[],
      total: number
   } | undefined;
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

   if (!tasksData || tasksData.tasks.length === 0) {
      return <p>No Task available</p>;
   }

   const taskListItems = tasksData.tasks.map((tasksData) => (
      <TaskListItem key={tasksData.id} data={tasksData} openedOn={page} />
   ));

   const remainingTasks = tasksData.total - tasksData.tasks.length

   return (
      <div className="flex flex-col h-0 grow gap-1 overflow-y-auto">
         {taskListItems}
         {remainingTasks > 0 && <div className='flex justify-center'>
            <p className='w-fit text-center py-2 cursor-pointer'>Load more</p>
         </div>}
      </div>
   );
};

interface TaskListItemProps {
   data: TaskPayload;
   openedOn: 'action-page' | 'project-page';
}

const TaskListItem = ({ data, openedOn }: TaskListItemProps) => {
   const editTasks = useEditTask({
      optimisticUpdate: {
         enable: true,
         key: ['tasks'],
         type: 'edit',
      },
   });
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
         entity: 'task',
         data: data,
      });
   };

   const handleCheck = (checked: CheckedState) => {
      if (checked) {
         setTimeout(() => {
            editTasks.mutate({
               id: data.id,
               status: 'finished',
            });
         }, 300);
      } else {
         setTimeout(() => {
            editTasks.mutate({
               id: data.id,
               status: 'pending',
            });
         }, 300);
      }
   };

   const handleCancelTask = () => {
      editTasks.mutate({
         id: data.id,
         status: 'cancelled'
      })
   }

   const isPastDue = new Date(data.dueAt) < new Date();

   return (
      <div className="grid grid-cols-[24px_auto] cursor-default hover:bg-background transition-colors duration-75 py-1 pl-2 rounded-lg group relative">
         <div className="w-[24px] flex items-start pt-1">
            {data.status === 'pending' && (
               <Checkbox
                  onCheckedChange={(checked) => handleCheck(checked)}
                  className="h-[16px] w-[16px] shadow-none rounded-full opacity-100 mr-2 transition-all duration-150"
               />
            )}
            {data.status === 'cancelled' && (
               <Checkbox
                  onCheckedChange={(checked) => handleCheck(checked)}
                  className="h-[16px] w-[16px] shadow-none rounded-full opacity-100 mr-2 transition-all duration-150"
               />
            )}
            {data.status === 'finished' && (
               <Checkbox
                  onCheckedChange={(checked) => handleCheck(checked)}
                  checked={true}
                  className="h-[16px] w-[16px] shadow-none rounded-full opacity-100 mr-2 transition-all duration-150"
               />
            )}
         </div>
         <p onClick={handleOpenDialog} className={cn(isPastDue && 'text-general-red')}>{data.name}</p>
         <div></div>
         <div
            className="flex text-sm text-secondary"
            onClick={handleOpenDialog}
         >
            {formattedTime && <p className="w-[60px]">{formattedTime}</p>}
            <p className="w-fit">{formattedDate}</p>
         </div>
         <div className="h-full absolute flex items-center pr-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <X
               className="h-4 cursor-pointer text-secondary"
               onClick={handleCancelTask}
            />
         </div>
      </div>
   );
};
