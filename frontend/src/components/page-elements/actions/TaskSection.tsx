import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/primitives/ToggleGroup';
import { useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { useTasksQuery } from '@/lib/api/task-api';
import { defaultTaskValue } from 'src/components/shared/ui/helpers/constants/default-values';
import { TaskList } from '@/components/page-elements/actions/TaskList';
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

   const { data: tasksData, isLoading } = useTasksQuery(taskFilter);

   const handleNewTask = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'action-page',
         type: 'task',
         data: {...defaultTaskValue},
      });
   };

   return (
      <div className="flex flex-col grow">
         <div className="flex w-full justify-between pb-1 pl-2">
            <div className="flex gap-1 items-center">
               <div className="flex items-end pb-3 gap-1">
                  <CircleCheck className="w-[28px] h-auto" />
                  <p className="text-xl leading-none mr-2">Tasks</p>
               </div>
               <ToggleGroup
                  type="single"
                  value={taskFilter.status}
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
            tasksData={tasksData}
            isLoading={isLoading}
            page="project-page"
         />
      </div>
   );
}
