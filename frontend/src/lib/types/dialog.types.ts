import {
   Contact,
   Event,
   Partner,
   Project,
   SalesDocumentItem,
   Task,
} from '@types';
import { Dispatch, SetStateAction } from 'react';

export interface FormDialogProps {
   formDialogState: FormDialogState;
   setFormDialogState: Dispatch<SetStateAction<FormDialogState>>;
   setPromptDialogState?: Dispatch<SetStateAction<PromptDialogState>>;
}

export interface PromptDialogProps {
   promptDialogState: PromptDialogState;
   setPromptDialogState: Dispatch<SetStateAction<PromptDialogState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

// export type FormDialogDataMap = {
//    task: Task;
//    event: Event;
//    file: File;
//    'project-settings': Project;
//    'client-contact': Contact;
//    'partner-contact': Partner;
//    'sales-document-item': SalesDocumentItem;
// };

// export interface FormDialogState<
//    T extends keyof FormDialogDataMap = keyof FormDialogDataMap
// > {
//    isOpen: boolean;
//    type: T;
//    mode: 'view' | 'create' | 'edit';
//    openedOn:
//       | 'project-page'
//       | 'all-project-page'
//       | 'client-page'
//       | 'all-client-page'
//       | 'action-page'
//       | 'file-page'
//       | 'document-page'
//       | 'client-page';
//    data: FormDialogDataMap[T];
// }

export type FormDialogState =
   | {
        isOpen: boolean;
        type: 'task';
        mode: 'view' | 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Task;
     }
   | {
        isOpen: boolean;
        type: 'event';
        mode: 'view' | 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Event;
     }
   | {
        isOpen: boolean;
        type: 'file';
        mode: 'view' | 'create' | 'edit';
        openedOn: OpenedOnType;
        data: File;
     }
   | {
        isOpen: boolean;
        type: 'project-settings';
        mode: 'view' | 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Project;
     }
   | {
        isOpen: boolean;
        type: 'client-contact';
        mode: 'view' | 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Contact;
     }
   | {
        isOpen: boolean;
        type: 'partner-contact';
        mode: 'view' | 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Partner;
     }
   | {
        isOpen: boolean;
        type: 'sales-document-item';
        mode: 'view' | 'create' | 'edit';
        openedOn: OpenedOnType;
        data: SalesDocumentItem;
     };

type OpenedOnType =
   | 'project-page'
   | 'all-project-page'
   | 'client-page'
   | 'all-client-page'
   | 'action-page'
   | 'file-page'
   | 'document-page'
   | 'client-page';

export interface PromptDialogState {
   isOpen: boolean;
   data: {
      label: string;
      action: () => void;
   };
}
