import {
   Select,
   SelectContent,
   DialogueSelectItem,
   DialogueSelectTrigger,
   SelectValue,
} from '@/components/shared/ui/FilterSelect';
import { useActiveProjectsQuery } from '@/lib/api/projectApi';
import { InputProps } from './props.type';
import { Controller } from 'react-hook-form';
import type { ActionFormData } from '@types';
import { Link } from 'react-router-dom';

const ProjectSelect = ({
   formMethods,
   dialogState,
}: InputProps<ActionFormData>): JSX.Element => {
   const {
      control,
      watch,
      formState: { errors },
   } = formMethods;
   const { data: activeProjects } = useActiveProjectsQuery();

   if (!activeProjects) {
      return <>No projects available</>;
   }

   const handleProjectChange = (
      value: string,
      onChange: (value: string) => void
   ) => {
      onChange(value); // Updates the 'project' field in the form
   };

   if (dialogState?.mode === 'view') {
      const currentProject = watch('project');
      const currentProjectId = watch('projectId');
      return <Link to={`../${currentProjectId}`}>{currentProject}</Link>;
   }

   return (
      <div>
         <Controller
            name="projectId"
            control={control}
            rules={{ required: 'Project is required' }}
            render={({ field }) => {
               return (
                  <Select
                     onValueChange={(value) =>
                        handleProjectChange(value, field.onChange)
                     }
                     value={field.value}
                  >
                     <DialogueSelectTrigger mode="base">
                        <p className="h-fit font-semibold flex gap-1 items-end text-wrap text-left line-clamp-3 overflow-hidden">
                           <SelectValue placeholder="Select a project" />
                        </p>
                     </DialogueSelectTrigger>
                     <SelectContent className="flex flex-col gap-1">
                        {activeProjects.map((project) => {
                           return (
                              <DialogueSelectItem
                                 key={project.id}
                                 value={project.id!}
                              >
                                 {project.name}
                              </DialogueSelectItem>
                           );
                        })}
                     </SelectContent>
                  </Select>
               );
            }}
         />
                  {errors.projectId && (
            <p className=" text-sm text-red-500 font-normal animate-shake">
               {errors.projectId.message}
            </p>
         )}
      </div>
   );
};

export default ProjectSelect;
