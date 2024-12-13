import { FieldValues, UseFormReturn } from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
  formMethods: UseFormReturn<TFieldValues>;
  value?: string; 
}

