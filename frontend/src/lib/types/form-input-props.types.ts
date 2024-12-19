import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormDialogState } from './dialog.types';
import { EventFormData, TaskFormData } from '@types';

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
   formMethods: UseFormReturn<TFieldValues>;
   dialogState?: FormDialogState;
   fieldName?: string
}

export interface SelectInputProps<
   TFieldValues extends FieldValues = FieldValues
> extends InputProps<TFieldValues> {
   selection: Selection[];
}

interface Selection {
   value: string;
   text: string;
   color: string;
}

export interface ProjectSelectProps {
  formMethods: UseFormReturn<TaskFormData | EventFormData>;
  dialogState?: FormDialogState;
}