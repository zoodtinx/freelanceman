import { ToggleGroup, ToggleGroupItem } from '@/components/shared/ui/primitives/ToggleGroup';
import { useRef, useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { NewActionButton } from '@/components/page-elements/actions/NewActionButton';
import { useAllTasksQuery, useDeleteTask } from '@/lib/api/task-api';
import { defaultTaskValue } from 'src/components/shared/ui/constants/default-values';

import { TaskList } from '@/components/page-elements/actions/TaskList';
import useDialogStore from '@/lib/zustand/dialog-store';

export default function TaskSection() {
   const setFormDialogState = useDialogStore((state) => state.setFormDialogState);

   const [taskFilter, setTaskFilter] = useState({
      status: 'pending',
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: tasksData, isLoading } = useAllTasksQuery(taskFilter);

   const handleNewTask = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'action-page',
         type: 'task',
         data: defaultTaskValue
      })
   }

   return (
      <div className="flex flex-col grow">
         <div className="flex w-full justify-between pb-1">
            <div className="flex gap-1 items-center">
               <div className="flex items-end pb-3 gap-1">
                  <CircleCheck className="w-[28px] h-auto" />
                  <p className="text-xl leading-none mr-2">Tasks</p>
               </div>
               <ToggleGroup
                  type="single"
                  value={taskFilter.status}
                  onValueChange={(value) =>
                     setTaskFilter((prev) => ({ ...prev, status: value }))
                  }
               >
                  <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
                  <ToggleGroupItem value="finished">Completed</ToggleGroupItem>
                  <ToggleGroupItem value="cancelled">Cancelled</ToggleGroupItem>
               </ToggleGroup>
            </div>
            <NewActionButton type="task" setDialogState={handleNewTask} />
         </div>
         <TaskList
            tasksData={tasksData}
            isLoading={isLoading}
            selectState={selectState}
            setSelectState={setSelectState}
         />
      </div>
   );
}
