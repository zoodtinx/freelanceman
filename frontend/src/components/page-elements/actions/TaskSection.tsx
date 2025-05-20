import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/primitives/ToggleGroup';
import { useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { useTasksQuery } from '@/lib/api/task-api';
import { defaultTaskValue } from 'src/components/shared/ui/helpers/constants/default-values';
import { TaskList } from '@/components/shared/ui/lists/TaskList';
import { TaskStatus, TaskFilterDto } from 'freelanceman-common/src/schemas';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AddButton from '@/components/shared/ui/AddButton';

export default function TaskSection() {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [taskFilter, setTaskFilter] = useState<TaskFilterDto>({
      status: 'pending',
   });

   const handleNewTask = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'action-page',
         entity: 'task',
         type: 'task',
         data: { ...defaultTaskValue },
      });
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex w-full justify-between p-4 pb-3">
            <div className="flex gap-1 items-center">
               <div className="flex items-end gap-1">
                  <CircleCheck className="w-[28px] h-auto" />
                  <p className="text-xl leading-none mr-2">Tasks</p>
               </div>
               <ToggleGroup
                  type="single"
                  className="pt-1"
                  value={taskFilter.status as any}
                  onValueChange={(value) =>
                     setTaskFilter((prev) => ({
                        ...prev,
                        status: value as TaskStatus,
                     }))
                  }
               >
                  <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
                  <ToggleGroupItem value="finished">Completed</ToggleGroupItem>
                  <ToggleGroupItem value="cancelled">Cancelled</ToggleGroupItem>
               </ToggleGroup>
            </div>
            <AddButton onClick={handleNewTask} />
         </div>
         <TaskList
            addFn={handleNewTask}
            filter={taskFilter}
            setFilter={setTaskFilter}
            page="action-page"
            className="px-2"
         />
      </div>
   );
}
