import { ToggleGroup, ToggleGroupItem } from '@/components/shared/ui/primitives/ToggleGroup';
import { cn } from '@/lib/helper/utils';
import { taskStatusSelections } from '@/components/shared/ui/selections';
import { useRef, useState } from 'react';
import { Calendar, CircleCheck } from 'lucide-react';
import { NewActionButton } from '@/components/page-elements/actions/NewActionButton';
import TaskDialog from '@/components/shared/ui/TaskDialog';
import { useAllTasksQuery, useDeleteTask } from '@/lib/api/task-api';
import { taskDefaultValues } from 'src/components/shared/ui/constants';

import type { FormDialogState } from '@/lib/types/dialog.types';
import type { TaskSearchOptions, TaskStatus } from '@types';

import { TaskList } from '@/components/page-elements/actions/TaskList';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import MultiSelectButton from '@/components/shared/ui/MultiSelectButton';
import { EditPopover } from '@/components/shared/ui/EditPopover';

export default function Tasks() {
   const taskSectionRef = useRef<HTMLDivElement | undefined>();
   const [taskDialogState, setTaskDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'task',
      data: taskDefaultValues,
      page: 'action-page'
   });

   const [taskFilter, setTaskFilter] = useState<TaskSearchOptions>({
      status: 'planned',
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: tasksData, isLoading } = useAllTasksQuery(taskFilter);
   const { mutate: deleteFile, isPending } = useDeleteTask();

   const setStatusFilter = (status: string) => {
      setTaskFilter({ status: status as TaskStatus });
   };

   const enableMultiSelect = () => {
      if (selectState.enableSelect) {
         return;
      }
      setSelectState({
         enableSelect: true,
         selectedValues: [],
      });
   };

   const selectAll = () => {
      if (!tasksData) {
         return;
      }
      setSelectState((prev) => {
         const selected = tasksData.map((task) => {
            return task.id;
         });
         return {
            ...prev,
            selectedValues: selected,
         };
      });
   };

   const handleStatusFilter = (value: any) => {
      setTaskFilter((prev) => {
         return {
            ...prev,
            status: value,
         };
      });
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskFilter((prev) => {
         return {
            ...prev,
            name: e.target.value,
         };
      });
   };

   return (
      <div className="flex flex-col grow">
         <div className="flex w-full justify-between pb-1">
            <div className="flex gap-1 items-center">
               <div className="flex items-end pb-3 gap-1">
                  <CircleCheck className="w-[28px] h-auto" />
                  <p className="text-xl leading-none mr-2">Tasks</p>
               </div>
               <ToggleGroup type="single" value={taskFilter.status}>
                  <ToggleGroupItem value='planned'>Planned</ToggleGroupItem>
                  <ToggleGroupItem value='finished'>Completed</ToggleGroupItem>
                  <ToggleGroupItem value='canceled'>Canceled</ToggleGroupItem>
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
