import { useAllTasksQuery } from '@/lib/api/task-api';
import { FormDialogState } from '@/lib/types/dialog.types';
import { Project, TaskSearchOptions } from '@types';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { ProjectTaskList } from '@/components/page-elements/project/ProjectTaskList';
import AddButton from '@/components/shared/ui/AddButton';
import TaskDialog from '@/components/shared/ui/TaskDialog';

const ProjectTask: React.FC<{project: Project}> = ({project}) => {
   const [taskDialogState, setTaskDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'task',
      data: {},
   });

   const [taskFilter, setTaskFilter] = useState<TaskSearchOptions>({
      status: 'planned',
      clientId: 'a1e45f22-5d78-4b2a-a24d-8c19ea5f3ef7'
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: tasksData, isLoading } = useAllTasksQuery(taskFilter);

   return (
      <div className="flex flex-col w-1/2">
         <div className="flex items-center justify-between px-3 h-11 text-lg cursor-default my-1">
            <p className="flex items-center gap-1 text-primary transition-colors duration-150">
               <CircleCheck className="w-5 h-5" style={{
                  color: project.accentColor
               }} />
               Task
            </p>
            <AddButton />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow px-1 pt-3">
            <ProjectTaskList
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
