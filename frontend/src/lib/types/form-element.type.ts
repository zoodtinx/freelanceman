import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface FormElementProps<
   TFieldValues extends FieldValues = FieldValues
> {
   formMethods: UseFormReturn<TFieldValues>;
   fieldName: string;
   required?: boolean;
   errorMessage?: string;
   placeholder?: string;
   className?: string;
}

export interface SelectElementProps<
   TFieldValues extends FieldValues = FieldValues
> extends FormElementProps<TFieldValues> {
   options: { label: string; value: string | number }[];
   multiple?: boolean;
}
