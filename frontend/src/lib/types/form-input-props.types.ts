import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormDialogState } from './form-dialog.types';

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
   formMethods: UseFormReturn<TFieldValues>;
   dialogState?: FormDialogState;
   fieldName: string;
   className?: string;
   placeholder?: string;
}

export interface DynamicHeightTextInputProps<
   TFieldValues extends FieldValues = FieldValues
> extends InputProps<TFieldValues> {
   isWithIcon: boolean;
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
