import { Control, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
   register?: UseFormRegister<TFieldValues>;
   setValue?: UseFormSetValue<TFieldValues>;
   getValues?: (field: Path<TFieldValues>) => string;
   watch?: (name?: string | string[], defaultValue?: unknown) => unknown;
   control?: Control<TFieldValues>;
}