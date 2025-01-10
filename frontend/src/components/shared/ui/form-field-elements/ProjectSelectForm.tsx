import { useAllProjectsQuery } from '@/lib/api/project-api';
import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputProps } from '@/lib/types/form-input-props.types';
import { SelectWithSearch } from '@/components/shared/ui/SelectWithSearch';
import { Project, ProjectSearchOptions } from '@types';

interface ProjectSelectProps<TFieldValues extends FieldValues>
   extends InputProps<TFieldValues> {
   filter?: ProjectSearchOptions;
}

const ProjectSelect = <TFieldValues extends FieldValues>({
   formMethods,
   dialogState,
   filter = { projectStatus: 'active' },
}: ProjectSelectProps<TFieldValues>): JSX.Element => {
   const {
      control,
      watch,
      formState: { errors },
      setValue,
   } = formMethods;
   const { data: activeProjects = [], isLoading } = useAllProjectsQuery(filter);

   if (!isLoading) {
      return <>Loading</>;
   }

   const selectContents = selectionConvert(activeProjects || []);

   const handleProjectChange = (
      value: string,
      onChange?: (value: string) => void
   ) => {
      if (onChange) {
         onChange(value); 
      }

      const selectedProject = activeProjects.find(
         (project) => project.id === value
      );
      if (selectedProject) {
         setValue(
            'client' as Path<TFieldValues>,
            selectedProject.client as PathValue<
               TFieldValues,
               Path<TFieldValues>
            >
         );
         setValue(
            'clientId' as Path<TFieldValues>,
            selectedProject.clientId as PathValue<
               TFieldValues,
               Path<TFieldValues>
            >
         );
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
                  <SelectWithSearch
                     value={field.value}
                     onValueChange={handleProjectChange}
                     selectContents={selectContents}
                     className="justify-normal items-center gap-1"
                  />
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

   return <></>;
};

const selectionConvert = (activeProject: Project[]) => {
   const selectContents = activeProject.map((project) => {
      return {
         value: project.id,
         label: project.name,
      };
   });
   return selectContents;
};

export default ProjectSelect;
