import { useAllTasksQuery } from '@/lib/api/task-api';
import { Project, TaskSearchOptions } from '@types';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/components/shared/ui/AddButton';
import { TaskList } from '@/components/page-elements/actions/TaskList';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultTaskValue } from '@/components/shared/ui/constants/default-values';

const ProjectTask: React.FC<{ project: Project }> = ({ project }) => {
   const setFormDialogState = useDialogStore((state) => state.setFormDialogState);
   
   const handleNewTask = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'project-page',
         type: 'task',
         data: defaultTaskValue
      })
   }

   const [taskFilter, setTaskFilter] = useState<TaskSearchOptions>({
      projectId: project.id,
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
            <AddButton onClick={handleNewTask} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow px-3 pt-3">
            <TaskList
               isLoading={isLoading}
               tasksData={tasksData}
            />
         </div>
      </div>
   );
};

export default ProjectTask;
