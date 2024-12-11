import {
   Select,
   SelectContent,
   DialogueSelectItem,
   DialogueSelectTrigger,
   SelectValue,
} from '@/components/shared/ui/FilterSelect';
import { useActiveProjectsQuery } from "@/lib/api/projectApi";
import { InputProps } from "./props.type";
import { Controller, FieldValues, Path } from "react-hook-form";
import { ChevronDown } from "lucide-react";


const ProjectSelect = <TFieldValues extends FieldValues = FieldValues>({
   control,
   setValue,
}: InputProps<TFieldValues>): JSX.Element => {
   const { data: activeProjects } = useActiveProjectsQuery();

   if (!activeProjects) {
      return <>No projects available</>;
   }

   const handleProjectChange = (value: string, onChange: (value: string) => void) => {
      onChange(value); // Updates the 'project' field in the form
      const selectedProject = activeProjects.find((project) => project.id === value);
      if (selectedProject) {
         setValue('client' as Path<TFieldValues>, selectedProject.client || ''); // Updates the 'client' field in the form
      }
   };

   return (
      <Controller
         name="projectId"
         control={control}
         rules={{ required: 'Please select a project' }}
         render={({ field }) => (
            <Select
               onValueChange={(value) => handleProjectChange(value, field.onChange)}
               value={field.value}
            >
               <DialogueSelectTrigger mode="base">
                  <p className="font-semibold text-md flex gap-1 items-end">
                     <SelectValue placeholder="Select a project" />
                     <ChevronDown className="w-4 h-auto" />
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
   );
};

export default ProjectSelect