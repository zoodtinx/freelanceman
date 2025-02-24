import { SelectItemContent } from '@/components/shared/ui/select/select.type';
import { SelectObject } from '@/lib/types/selector-dialog.types';
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
   isWithIcon: boolean;
}
