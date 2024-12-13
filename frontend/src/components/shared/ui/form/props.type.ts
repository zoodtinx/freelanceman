import { Control, FieldValues, Path, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
   register?: UseFormRegister<TFieldValues>;
   setValue?: UseFormSetValue<TFieldValues>;
   getValues?: (field: Path<TFieldValues>) => string;
   value?: UseFormSetValue<TFieldValues>;
   watch?: (name?: string | string[], defaultValue?: unknown) => unknown;
   control?: Control<TFieldValues>;
}