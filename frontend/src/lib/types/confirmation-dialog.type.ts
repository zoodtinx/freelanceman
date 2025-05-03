import { FormDialogType } from '@/lib/types/form-dialog.types';

export interface ConfirmationDialogState {
   isOpen: boolean;
   type: 'delete' | 'unsaved-changes';
   dialogRequested?: {
      type: FormDialogType;
      mode: 'create' | 'edit';
   };
   entityName: string;
   additionalMessage?: string;
   actions: {
      primary: () => void;
      secondary?: () => void;
   };
   appearance?: {
      overlay?: boolean;
      size?: 'sm' | 'md' | 'lg';
   };
}
