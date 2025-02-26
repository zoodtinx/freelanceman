import { FormDialogState } from "@/lib/types/form-dialog.types";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

export interface ApiLoadingState {
   isLoading: boolean,
   type: 'submit' | 'discard'
}

export interface FormButtonProps {
   formMethods: UseFormReturn;
   formDialogState: FormDialogState;
   isApiLoading: ApiLoadingState;
   setIsApiLoading: Dispatch<SetStateAction<ApiLoadingState>>;
   action?: () => void;
}