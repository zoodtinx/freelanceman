import { Textarea } from "@/components/shared/ui/primitives/Textarea";
import { cn } from "@/lib/helper/utils";
import { InputProps } from "@/lib/types/form-input-props.types";
import { FieldValues, Path } from "react-hook-form";

const TextareaForm = <TFieldValues extends FieldValues>({
   formMethods,
   dialogState,
   fieldName,
   className
}: InputProps<TFieldValues>): JSX.Element => {
   const { register, getValues } = formMethods;
   const details = getValues(fieldName as Path<TFieldValues>);

   if (dialogState?.mode === 'view') {
      return (
            <p className="whitespace-pre-wrap">{details || 'No details provided.'}</p>
      );
   }

   return (
      <Textarea
         className={cn("resize-none border-secondary placeholder:text-secondary w-full p-2 rounded-md", className)}
         placeholder="Describe this event like you're briefing your future self."
         defaultValue={dialogState?.mode === 'edit' ? details : ''} 
         {...register(fieldName as Path<TFieldValues>)}
      />
   );
};

export default TextareaForm