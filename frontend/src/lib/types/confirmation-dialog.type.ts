import { FormDialogType } from "@/lib/types/form-dialog.types";

export interface ConfirmationDialogState {
   isOpen: boolean;
   type: 'delete' | 'confirm';
   openedFrom: FormDialogType;
   message: string;
   actions: {
      primary: () => void;
      secondary: () => void;
   };
}
