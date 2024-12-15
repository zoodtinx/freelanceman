import { DialogState } from "@/lib/context/ProjectViewContextTypes";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
  formMethods: UseFormReturn<TFieldValues>;
  dialogState?: DialogState
}

