import { useTaskQuery } from "@/lib/api/task-api";
import { FormDialogType } from "@/lib/types/form-dialog.types";
import { UseFormReturn } from "react-hook-form";

export const handleSubmit = (
   entity: FormDialogType,
   mode: string,
   formMethods: UseFormReturn
) => {
   console.log('submitting');
};

const submitTask = (mode: string, formMethods: UseFormReturn<Task>) => {
   const {} = useTaskQuery()
   const { trigger, getValues, formState: {errors} } = formMethods
   const data = getValues()

   trigger()
   if (errors) {
      return
   }

   if (mode === 'create') {
      const createTaskPayload: CreateTaskDto = {
         name: data.name,
         status: data.status, // Ensure this is a valid TaskStatus
         projectId: data.projectId,
         clientId: data.clientId,
         dueAt: data.dueAt,
         details: data.details ?? "",
         link: data.link ?? "",
      };      
   }
}