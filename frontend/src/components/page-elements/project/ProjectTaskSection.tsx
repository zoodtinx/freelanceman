import { useAllTasksQuery } from '@/lib/api/task-api';
import { Project, TaskSearchOptions } from '@types';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddButton from '@/components/shared/ui/AddButton';
import { TaskList } from '@/components/page-elements/actions/TaskList';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultTaskValue } from 'src/components/shared/ui/helpers/constants/default-values';
import { ProjectPageSectionProps } from '@/routes/ProjectPage';

const ProjectTaskSection: React.FC<ProjectPageSectionProps> = ({ project }) => {
   const setFormDialogState = useDialogStore(
      (state) => state.setFormDialogState
   );

   const [taskFilter, setTaskFilter] = useState<TaskSearchOptions>({
      projectId: project?.id,
   });

   const { data: tasksData, isLoading } = useAllTasksQuery(taskFilter);

   useEffect(() => {
      if (project?.id) {
         setTaskFilter((prev: TaskSearchOptions) => ({
            ...prev,
            projectId: project.id,
         }));
      }
   }, [project?.id]);

   const handleNewTask = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'project-page',
         type: 'task',
         data: {...defaultTaskValue, themeColor:project.themeColor},
      });
   };

   return (
      <div className="flex flex-col w-1/2">
         <div className="flex justify-between items-center pl-3 pr-2">
            <p className="flex items-center h-9 text-md gap-1">
               <CircleCheck className="w-4 h-4" />
               Task
            </p>
            <AddButton onClick={handleNewTask} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow px-2 pt-2">
               <TaskList isLoading={isLoading} tasksData={tasksData} />
         </div>
      </div>
   );
};

export default ProjectTaskSection;
