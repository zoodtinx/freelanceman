import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormDialogState } from "./dialog.types";

export interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  formMethods: UseFormReturn<TFieldValues>;
  dialogState?: FormDialogState;
}

