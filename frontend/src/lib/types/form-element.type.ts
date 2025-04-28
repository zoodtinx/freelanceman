import { SelectItemContent } from '@/components/shared/ui/select/select.type';
import { FormDialogState } from '@/lib/types/form-dialog.types';
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
   type: 'client' | 'project';
   isWithIcon?: boolean;
   // queryHook: () => UseQueryResult<any[], unknown>;
}

export interface DynamicHeightTextInputFormElementProps<
   TFieldValues extends FieldValues = FieldValues
> extends FormElementProps<TFieldValues> {
   isWithIcon?: boolean;
}

export interface SubmitButtonProps {
   formMethods: UseFormReturn;
   formDialogState: FormDialogState;
   isApiLoading: {
      isLoading: boolean;
      type: 'submit' | 'destructive';
   };
}

export interface DestructiveButtonProps {
   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
   formDialogState: FormDialogState;
   deleteText?: string;
   discardText?: string;
   isApiLoading: {
      isLoading: boolean;
      type: 'submit' | 'destructive';
   };
}