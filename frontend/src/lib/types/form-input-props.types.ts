import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormDialogState } from './form-dialog.types';

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
   formMethods: UseFormReturn<TFieldValues>;
   dialogState?: FormDialogState;
   fieldName: string;
   className?: string;
   placeholder?: string;
}
