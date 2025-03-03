import { FormDialogState, FormDialogType } from "@/lib/types/form-dialog.types";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

export interface ApiLoadingState {
   isLoading: boolean,
   type: 'submit' | 'discard'
}

export interface SubmitButtonProps {
   formMethods: UseFormReturn;
   formDialogState: FormDialogState;
   isApiLoading: ApiLoadingState;
   setIsApiLoading: Dispatch<SetStateAction<ApiLoadingState>>;
}

export interface DestructiveButtonProps extends SubmitButtonProps {
   action: () => Promise<void>;
}