import { Dispatch, SetStateAction } from 'react';

// export type FormDialogState =
//    | {
//         isOpen: boolean;
//         id: string;
//         type: 'task';
//         mode: 'view' | 'create' | 'edit';
//         data: TaskFormData;
//      }
//    | {
//         isOpen: boolean;
//         id: string;
//         type: 'event';
//         mode: 'view' | 'create' | 'edit';
//         data: EventFormData;
//      }
//    | {
//         isOpen: boolean;
//         id: string;
//         type: 'project';
//         mode: 'view' | 'create' | 'edit';
//         data: Project;
//      }
//    | {
//         isOpen: boolean;
//         id: string;
//         type: 'file';
//         mode: 'view' | 'create' | 'edit';
//         data: FileFormData;
//      }
//    | {
//         isOpen: boolean;
//         id: string;
//         type: 'document';
//         mode: 'view' | 'create' | 'edit';
//         data: DocumentFormData;
//      }
//    | {
//         isOpen: boolean;
//         id: string;
//         type: 'client-contact';
//         mode: 'view' | 'create' | 'edit';
//         data: Contact;
//      }
//    | {
//         isOpen: boolean;
//         id: string;
//         type: 'partner-contact';
//         mode: 'view' | 'create' | 'edit';
//         data: Contact;
//      };

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