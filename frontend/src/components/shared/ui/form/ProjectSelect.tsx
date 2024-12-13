import {
   Select,
   SelectContent,
   DialogueSelectItem,
   DialogueSelectTrigger,
   SelectValue,
} from '@/components/shared/ui/FilterSelect';
import { useActiveProjectsQuery } from '@/lib/api/projectApi';
import { InputProps } from './props.type';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';

const ProjectSelect = <TFieldValues extends FieldValues = FieldValues>({
   control,
   mode
}: InputProps<TFieldValues>): JSX.Element => {
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

   return (
      <Controller
         name="projectId"
         control={control}
         rules={{ required: 'Please select a project' }}
         render={({ field }) => {
            console.log('field', field.value);

            return (
               <Select
                  onValueChange={(value) =>
                     handleProjectChange(value, field.onChange)
                  }
                  value={field.value}
               >
                  <DialogueSelectTrigger mode="base">
                     <p className="font-semibold text-md flex gap-1 items-end text-wrap text-left line-clamp-3 overflow-hidden">
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
   );
};

export default ProjectSelect;
