import { FieldValues, UseFormReturn } from "react-hook-form";


interface FormElementProps<TFieldValues extends FieldValues = FieldValues> {
   formMethods: UseFormReturn<TFieldValues>;
   fieldName: string;
   required?: boolean;
   errorMessage?: string;
   placeholder?: string
}

export const TextInputForm = <TFormData extends FieldValues>({
   formMethods
}: FormElementProps<TFormData>) => {
   return (
      <p>Hey</p>
   )
}