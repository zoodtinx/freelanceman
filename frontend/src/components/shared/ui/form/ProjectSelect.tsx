import {
   Select,
   SelectContent,
   DialogueSelectItem,
   DialogueSelectTrigger,
   SelectValue,
} from '@/components/shared/ui/FilterSelect';
import { useFilteredProjectsQuery } from '@/lib/api/project-api';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputProps } from '@/lib/types/form-input-props.types';

const ProjectSelect = <TFieldValues extends FieldValues>({
   formMethods,
   dialogState,
}: InputProps<TFieldValues>): JSX.Element => {
   const {
      control,
      watch,
      formState: { errors },
      setValue,
   } = formMethods;
   const { data: activeProjects } = useFilteredProjectsQuery('projectStatus', 'active');

   if (!activeProjects) {
      return <>No projects available</>;
   }

   const handleProjectChange = (
      value: string,
      onChange: (value: string) => void
   ) => {
      onChange(value);
      const selectedProject = activeProjects.find((project) => project.id === value);
      if (selectedProject) {
         setValue('client' as Path<TFieldValues>, selectedProject.client);
         setValue('clientId' as Path<TFieldValues>, selectedProject.clientId);
      }
   };

   const currentProject = watch('project' as Path<TFieldValues>);
   const currentProjectId = watch('projectId' as Path<TFieldValues>);

   if (dialogState?.mode === 'view') {
      return currentProject ? (
         <Link to={`../${currentProjectId}`} className="text-primary">
            {currentProject}
         </Link>
      ) : (
         <p className="text-gray-500">No project selected</p>
      );
   }

   if (dialogState?.mode === 'edit') {
      return (
         <p className="text-secondary text-base">
            {currentProject || 'No project selected'}
         </p>
      );
   }

   if (dialogState?.mode === 'create') {
      return (
         <div>
            <Controller
               name={'projectId' as Path<TFieldValues>}
               control={control}
               rules={{ required: 'Project is required' }}
               render={({ field }) => (
                  <Select
                     onValueChange={(value) => handleProjectChange(value, field.onChange)}
                     value={field.value}
                  >
                     <DialogueSelectTrigger mode="base">
                        <p className="h-fit font-semibold flex gap-1 items-end text-wrap text-left line-clamp-3 overflow-hidden">
                           <SelectValue placeholder="Select a project" />
                        </p>
                     </DialogueSelectTrigger>
                     <SelectContent className="flex flex-col gap-1">
                        {activeProjects.map((project) => (
                           <DialogueSelectItem key={project.id} value={project.id!}>
                              {project.name}
                           </DialogueSelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               )}
            />
            {errors.projectId && (
               <p className="text-sm text-red-500 font-normal animate-shake">
                  {errors.projectId.message as string}
               </p>
            )}
         </div>
      );
   }

   return null;
};

export default ProjectSelect;
