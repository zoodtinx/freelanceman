import { Dispatch, SetStateAction } from 'react';

export interface DialogProps {
   dialogState: FormDialogState;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export interface FormDialogState {
   isOpen: boolean,
   id: string;
   type: "task" | "event" | "project" | "file" | "document" | "client-contact" | "partner-contact";
   mode: 'view' | 'create' | 'edit';
   data: Record<string, any>
}