import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import {
   TaskFilterDto,
   TaskFindManyItem,
   TaskFindManyResponse,
} from 'freelanceman-common';
import { CheckedState } from '@radix-ui/react-checkbox';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useDeleteTask, useEditTask } from '@/lib/api/task-api';
import { Trash } from 'lucide-react';
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
import { ListProps } from '@/lib/types/list-props.type';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import ActionPageEventListPlaceholder from '@/components/shared/ui/placeholder-ui/ActionPageEventListPlaceholder';
import SearchNotFoundPlaceholder from '@/components/shared/ui/placeholder-ui/SearchNotFoundPlaceHolder';

export const TaskList: React.FC<
   ListProps<TaskFindManyResponse, TaskFilterDto>
> = ({
   addFn,
   setFilter,
   loader = 'skeleton',
   page,
   queryResult,
   className,
}) => {
   const { data: tasksData, isLoading, isError, refetch } = queryResult;

   const lastItemRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!tasksData || tasksData?.items?.length - 5 <= 30) {
         return;
      }

      if (lastItemRef.current) {
         lastItemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
         });
      }
   }, [tasksData?.items?.length]);

   if (isLoading) {
      if (loader == 'skeleton') {
         return (
            <div className="px-2">
               <TaskListLoader />
            </div>
         );
      } else {
         return <LoadingPlaceHolder />;
      }
   }

   if (isError || !tasksData) {
      return <ApiErrorPlaceHolder retryFn={refetch} />;
   }

   if (tasksData?.total === 0) {
      if (page === 'projectPage') {
         return <NoDataPlaceHolder addFn={addFn}>Add a task</NoDataPlaceHolder>
      }
      if (tasksData.unfilteredTotal === 0) {
         return <ActionPageEventListPlaceholder addFn={addFn} />;
      }
      return (
         <SearchNotFoundPlaceholder>
            No task matched your search.
         </SearchNotFoundPlaceholder>
      );
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
      <ScrollArea
         className={cn(
            'flex flex-col h-0 grow gap-1 overflow-y-auto',
            className
         )}
      >
         {taskListItems}
         {remainingTasks && (
            <div className="flex justify-center pt-3 pb-8">
               <LoadMoreButton
                  loadMoreFn={handleLoadMore}
                  isLoading={isLoading}
               />
            </div>
         )}
      </ScrollArea>
   );
};

interface TaskListItemProps {
   data: TaskFindManyItem;
   openedOn: 'actionPage' | 'projectPage';
}

const TaskListItem = forwardRef<HTMLDivElement, TaskListItemProps>(
   ({ data, openedOn }, ref) => {
      const editTask = useEditTask();
      const deleteTask = useDeleteTask();

      const setFormDialogState = useFormDialogStore(
         (state) => state.setFormDialogState
      );

      const formattedDate = formatDate(data.dueAt, 'LONG');
      const formattedTime = formatTime(data.dueAt ?? '');

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

      const handleCheck = async (checked: CheckedState) => {
         setTimeout(
            async () => {
               try {
                  await editTask.mutateAsync({
                     id: data.id,
                     status: checked ? 'completed' : 'pending',
                  });
               } catch {
                  toast.error('Something went wrong. Please try again.');
               }
            },
            checked ? 400 : 0
         );
      };

      const handleDelete = () => {
         deleteTask.mutate(data.id);
      };

      const isPastDue = new Date(data.dueAt ?? '') < new Date();

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
               {data.status === 'completed' && (
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
            <div
               className="h-full absolute flex items-center pr-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
               onClick={handleDelete}
            >
               <Trash className="h-4 cursor-pointer text-secondary hover:text-primary" />
            </div>
         </div>
      );
   }
);

TaskListItem.displayName = 'TaskListItem';
