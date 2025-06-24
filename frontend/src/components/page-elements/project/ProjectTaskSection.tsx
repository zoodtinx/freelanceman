import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/primitives/ToggleGroup';
import { CircleCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddButton from '@/components/shared/ui/AddButton';
import { TaskList } from '@/components/shared/ui/lists/TaskList';
import {
   defaultClientValue,
   defaultTaskValue,
} from 'src/components/shared/ui/helpers/constants/default-values';
import {
   ClientFindManyItem,
   ProjectFindOneResponse,
   TaskFilterDto,
   TaskStatus,
} from 'freelanceman-common';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useTasksQuery } from '@/lib/api/task-api';

const ProjectTaskSection = ({
   project,
}: {
   project: ProjectFindOneResponse;
}) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [taskFilter, setTaskFilter] = useState<TaskFilterDto>({
      projectId: project.id,
      status: 'pending',
   });

   const tasksQueryResult = useTasksQuery(taskFilter);
   const { isFetching } = tasksQueryResult;

   useEffect(() => {
      if (project?.id) {
         setTaskFilter((prev: TaskFilterDto) => ({
            ...prev,
            projectId: project.id,
         }));
      }
   }, [project?.id]);

   const handleNewEvent = () => {
      const { themeColor, ...clientData } =
         defaultClientValue as ClientFindManyItem;
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'projectPage',
         type: 'task',
         entity: 'task',
         data: {
            ...defaultTaskValue,
            client: {
               themeColor: project.client?.themeColor,
               ...clientData,
            },
            clientId: project.clientId ?? '',
            projectId: project.id,
         },
      });
   };

   return (
      <div className="flex flex-col w-full">
         <div className="flex justify-between items-center pl-3 pr-2">
            <p className="flex items-center h-9 text-md gap-1 lg:font-normal">
               <CircleCheck className="w-4 h-4" />
               Task
            </p>
            <div className="flex gap-1">
               <ToggleGroup
                  type="single"
                  value={taskFilter.status!}
                  onValueChange={(value) => {
                     if (value === taskFilter.status || !value) return;
                     setTaskFilter((prev) => ({
                        ...prev,
                        status: value as TaskStatus,
                     }));
                  }}
               >
                  <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
                  <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
               </ToggleGroup>
               {isFetching ? (
                  <div className="h-[33px] w-[33px] p-1">
                     <Loader2 className="w-full h-full sm:w-[22px] animate-spin" />
                  </div>
               ) : (
                  <AddButton onClick={handleNewEvent} />
               )}
            </div>
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex flex-col grow px-2 pt-2">
            <TaskList
               addFn={handleNewEvent}
               filter={taskFilter}
               setFilter={setTaskFilter}
               loader="spinner"
               queryResult={tasksQueryResult}
               page="projectPage"
            />
         </div>
      </div>
   );
};

export default ProjectTaskSection;
