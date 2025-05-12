import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import { TaskFilterDto, TaskListPayload, TaskPayload } from 'freelanceman-common';
import { CheckedState } from '@radix-ui/react-checkbox';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useEditTask, useTasksQuery } from '@/lib/api/task-api';
import { X } from 'lucide-react';
import { cn } from '@/lib/helper/utils';
import {
   ApiErrorPlaceHolder,
   LoadingPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import TaskListLoader from '@/components/shared/ui/placeholder-ui/TaskListLoader';
import { forwardRef } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { ListProps } from '@/lib/types/list-props.type';

export const TaskList: React.FC<ListProps<TaskFilterDto>> = ({
   addFn,
   filter,
   setFilter,
   page,
   loader = 'skeleton'
}) => {
   const {
      data: tasksData,
      isLoading,
      isError,
      refetch,
   } = useTasksQuery(filter) as UseQueryResult<TaskListPayload>;

   const lastItemRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!tasksData || tasksData?.items?.length <= 20) {
         return;
      }

      if (lastItemRef.current) {
         lastItemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
         });
      }
   }, [tasksData?.items.length]);

    if (isLoading) {
      if (loader == 'skeleton') {
         return <TaskListLoader />;
      } else {
         return <LoadingPlaceHolder />;
      }
   }

   if (isError) {
      return <ApiErrorPlaceHolder retryFn={refetch} />;
   }

   if (!tasksData || tasksData.items.length === 0) {
      return <NoDataPlaceHolder addFn={addFn} children="Add New Event" />;
   }

   const taskListItems = tasksData.items.map((taskData, index, arr) => {
      const isLast = index === arr.length - 1;

      return (
         <TaskListItem
            key={taskData.id}
            data={taskData}
            openedOn={page as any}
            ref={isLast ? lastItemRef : undefined}
         />
      );
   });

   const remainingTasks = tasksData.total - tasksData.items.length > 0;

   const handleLoadMore = () => {
      const curentLength = tasksData?.items.length;

      if (!curentLength) {
         return;
      }

      setFilter((prev) => {
         return {
            ...prev,
            take: curentLength + 13,
         };
      });
   };

   return (
      <div className="flex flex-col h-0 grow gap-1 overflow-y-auto">
         {taskListItems}
         {remainingTasks && (
            <div className="flex justify-center pt-3 pb-2">
               <LoadMoreButton
                  loadMoreFn={handleLoadMore}
                  isLoading={isLoading}
               />
            </div>
         )}
      </div>
   );
};

interface TaskListItemProps {
   data: TaskListPayload['items'][number];
   openedOn: 'action-page' | 'project-page';
}

const TaskListItem = forwardRef<HTMLDivElement, TaskListItemProps>(
   ({ data, openedOn }, ref) => {
      const editTasks = useEditTask({
         errorCallback() {
            toast.error('Error cancelling task');
         },
         successCallback() {
            toast.error('Task cancelled');
         },
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
            data: { ...data },
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
            status: 'cancelled',
         });
      };

      const isPastDue = new Date(data.dueAt) < new Date();

      return (
         <div
            ref={ref ? ref : undefined}
            className="grid grid-cols-[24px_auto] cursor-default hover:bg-background transition-colors duration-75 py-1 pl-2 rounded-lg group relative"
         >
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
            <p
               onClick={handleOpenDialog}
               className={cn(isPastDue && 'text-general-red')}
            >
               {data.name}
            </p>
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
   }
);

TaskListItem.displayName = 'TaskListItem';
