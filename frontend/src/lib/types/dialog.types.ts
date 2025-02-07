import { Dispatch, SetStateAction } from 'react';

export interface DialogProps {
   dialogState: FormDialogState;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   setPromptDialogState?: Dispatch<SetStateAction<PromptDialogState>>;
}

export interface PromptDialogProps {
   promptDialogState: PromptDialogState;
   setPromptDialogState: Dispatch<SetStateAction<PromptDialogState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export interface FormDialogState {
   isOpen: boolean;
   id: string;
   type:
      | 'task'
      | 'event'
      | 'project'
      | 'file'
      | 'document'
      | 'client-contact'
      | 'partner-contact'
      | 'quotation'
      | 'invoice'
      | 'receipt'
      | 'sales-document-item';
   mode: 'view' | 'create' | 'edit';
   page: 'project-page' | 'action-page' | 'file-page' | 'document-page' ;
   data: Record<string, any>;
}

export interface PromptDialogState {
   isOpen: boolean;
   data: {
      label: string,
      action: () => void
   };
}
