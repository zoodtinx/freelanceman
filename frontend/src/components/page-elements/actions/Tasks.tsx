import { ToggleGroup, ToggleGroupItem } from '@/components/shared/ui/primitives/ToggleGroup';
import { useRef, useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { NewActionButton } from '@/components/page-elements/actions/NewActionButton';
import TaskDialog from '@/components/shared/ui/TaskDialog';
import { useAllTasksQuery, useDeleteTask } from '@/lib/api/task-api';
import { taskDefaultValues } from 'src/components/shared/ui/constants';

import type { FormDialogState } from '@/lib/types/dialog.types';
import type { TaskSearchOptions, TaskStatus } from '@types';

import { TaskList } from '@/components/page-elements/actions/TaskList';

export default function Tasks() {
   const [taskDialogState, setTaskDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'task',
      data: taskDefaultValues,
      page: 'action-page'
   });

   const [taskFilter, setTaskFilter] = useState({
      status: 'planned',
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: tasksData, isLoading } = useAllTasksQuery(taskFilter);

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
                  <ToggleGroupItem value="planned">Planned</ToggleGroupItem>
                  <ToggleGroupItem value="finished">Completed</ToggleGroupItem>
                  <ToggleGroupItem value="canceled">Canceled</ToggleGroupItem>
               </ToggleGroup>
            </div>
            <NewActionButton type="task" setDialogState={setTaskDialogState} />
         </div>
         <TaskList
            tasksData={tasksData}
            isLoading={isLoading}
            selectState={selectState}
            setSelectState={setSelectState}
            setDialogState={setTaskDialogState}
         />
         <TaskDialog
            dialogState={taskDialogState}
            setDialogState={setTaskDialogState}
         />
      </div>
   );
}
