import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormDialogState } from './dialog.types';
import { EventFormData, TaskFormData } from '@types';

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
   formMethods: UseFormReturn<TFieldValues>;
   dialogState?: FormDialogState;
   fieldName?: string;
   className?: string;
}

export interface SelectInputProps<
   TFieldValues extends FieldValues = FieldValues
> extends InputProps<TFieldValues> {
   selection: Selection[];
   placeholder?: string;
   defaultValue?: string;
}

interface Selection {
   value: string;
   label: string;
   color: string;
}

export interface ProjectSelectProps {
   formMethods: UseFormReturn<TaskFormData | EventFormData>;
   dialogState?: FormDialogState;
}

export interface SelectWithSearchInputProps<
   TFieldValues extends FieldValues = FieldValues
> extends InputProps<TFieldValues> {
   selection: Selection[];
   placeholder?: string;
   isLoading: boolean;
   ApiSearchFn: (value: string) => void;
}
