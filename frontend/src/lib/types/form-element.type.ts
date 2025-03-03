import { SelectItemContent } from '@/components/shared/ui/select/select.type';
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

export interface SelectFormElementProps<
   TFieldValues extends FieldValues = FieldValues
> extends FormElementProps<TFieldValues> {
   selection: SelectItemContent[];
   isWithIcon?: boolean;
}

export interface SelectWithSearchFormElementProps<
   TFieldValues extends FieldValues = FieldValues
> extends FormElementProps<TFieldValues> {
   size?: 'sm' | 'base' | 'lg';
   type: 'client' | 'project'
   isWithIcon?: boolean;
}

export interface DynamicHeightTextInputFormElementProps<
   TFieldValues extends FieldValues = FieldValues
> extends FormElementProps<TFieldValues> {
   isWithIcon?: boolean;
}
