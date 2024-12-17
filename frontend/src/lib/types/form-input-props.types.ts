import { DialogState } from "src/lib/types/project-view-context.types";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
  formMethods: UseFormReturn<TFieldValues>;
  dialogState?: DialogState
  data?: unknown
}

