import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/primitives/ToggleGroup';
import { useState } from 'react';
import { CircleCheck, Loader2 } from 'lucide-react';
import { defaultTaskValue } from 'src/components/shared/ui/helpers/constants/default-values';
import { TaskList } from '@/components/shared/ui/lists/TaskList';
import { TaskStatus, TaskFilterDto } from 'freelanceman-common/src/schemas';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AddButton from '@/components/shared/ui/AddButton';
import { cn } from '@/lib/helper/utils';
import { useTaskQuery, useTasksQuery } from '@/lib/api/task-api';

export default function TaskSection() {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [taskFilter, setTaskFilter] = useState<TaskFilterDto>({
      status: 'pending',
   });

   const tasksQueryResult = useTasksQuery(taskFilter);
   const { isFetching } = tasksQueryResult;

   const handleNewTask = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'actionPage',
         entity: 'task',
         type: 'task',
         data: { ...defaultTaskValue },
      });
   };

   return (
      <div className="flex flex-col h-full">
         <div
            className={cn(
               'flex w-full justify-between p-2 pl-3',
               'sm:p-2 sm:px-2'
            )}
         >
            <div className="flex gap-1 items-center">
               <div className="flex items-end gap-1 sm:items-center">
                  <CircleCheck className="w-[28px] h-auto sm:w-[22px]" />
                  <p className="text-xl leading-none mr-2 sm:text-lg">Tasks</p>
               </div>
               <ToggleGroup
                  type="single"
                  className="pt-1 sm:pt-0"
                  value={taskFilter.status as any}
                  onValueChange={(value) => {
                     if (value === taskFilter.status || !value) return;
                     setTaskFilter((prev) => ({
                        ...prev,
                        status: value as TaskStatus,
                     }))
                  }
                  }
               >
                  <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
                  <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
               </ToggleGroup>
            </div>
            {isFetching ? (
               <div className="h-[33px] w-[33px] p-1">
                  <Loader2 className="w-full h-full sm:w-[22px] animate-spin" />
               </div>
            ) : (
               <AddButton onClick={handleNewTask} />
            )}
         </div>
         <TaskList
            addFn={handleNewTask}
            filter={taskFilter}
            setFilter={setTaskFilter}
            page="action-page"
            className="px-2"
            queryResult={tasksQueryResult}
         />
      </div>
   );
}
