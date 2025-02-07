import { useAllTasksQuery } from '@/lib/api/task-api';
import { FormDialogState } from '@/lib/types/dialog.types';
import { Project, TaskSearchOptions } from '@types';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { ProjectTaskList } from '@/components/page-elements/project/ProjectTaskList';
import AddButton from '@/components/shared/ui/AddButton';
import TaskDialog from '@/components/shared/ui/TaskDialog';
import { TaskList } from '@/components/page-elements/actions/TaskList';

const ProjectTask: React.FC<{ project: Project }> = ({ project }) => {
   const [taskDialogState, setTaskDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'task',
      data: {},
      page: 'project-page',
   });

   const [taskFilter, setTaskFilter] = useState<TaskSearchOptions>({
      projectId: project.id,
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: tasksData, isLoading } = useAllTasksQuery(taskFilter);

   return (
      <div className="flex flex-col w-1/2">
         <div className="flex justify-between items-center pl-3 pr-2">
            <p className="flex items-center h-9 text-md gap-1">
               <CircleCheck
                  className="w-4 h-4"
                  style={{
                     color: project.themeColor,
                  }}
               />
               Task
            </p>
            <AddButton />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow px-3 pt-3">
            <TaskList
               isLoading={isLoading}
               setDialogState={setTaskDialogState}
               tasksData={tasksData}
            />
         </div>
         <TaskDialog
            dialogState={taskDialogState}
            setDialogState={setTaskDialogState}
         />
      </div>
   );
};

export default ProjectTask;
