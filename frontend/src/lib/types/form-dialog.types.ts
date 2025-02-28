import {
   Contact,
   CreateClientDto,
   CreateFileDto,
   CreateProjectDto,
   EditClientDto,
   Event,
   Partner,
   Project,
   SalesDocumentItem,
   Task,
   User,
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

export type FormDialogState =
   | {
        isOpen: boolean;
        type: 'task';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Task;
     }
   | {
        isOpen: boolean;
        type: 'event';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Event;
     }
   | {
        isOpen: boolean;
        type: 'file';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: File;
     }
   | {
        isOpen: boolean;
        type: 'new-file';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: CreateFileDto;
     }
   | {
        isOpen: boolean;
        type: 'project-settings';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Project;
     }
   | {
        isOpen: boolean;
        type: 'client-contact';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Contact;
     }
   | {
        isOpen: boolean;
        type: 'partner-contact';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: Partner;
     }
   | {
        isOpen: boolean;
        type: 'sales-document-item';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: SalesDocumentItem;
     }
   | {
        isOpen: boolean;
        type: 'user-profile';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: User;
     }
   | {
        isOpen: boolean;
        type: 'new-project';
        mode: 'create';
        openedOn: OpenedOnType;
        data: CreateProjectDto;
     }
   | {
        isOpen: boolean;
        type: 'new-client';
        mode: 'create';
        openedOn: OpenedOnType;
        data: CreateClientDto;
     }
   | {
        isOpen: boolean;
        type: 'client-settings';
        mode: 'edit';
        openedOn: OpenedOnType;
        data: EditClientDto;
     };

export type FormDialogType =
   | 'task'
   | 'event'
   | 'file'
   | 'project-settings'
   | 'client-contact'
   | 'partner-contact'
   | 'sales-document-item'
   | 'user-profile'
   | 'new-project'
   | 'new-client';

export type OpenedOnType =
   | 'project-page'
   | 'all-project-page'
   | 'client-page'
   | 'all-client-page'
   | 'action-page'
   | 'file-page'
   | 'document-page'
   | 'client-page'
   | 'global-add-button';

export interface PromptDialogState {
   isOpen: boolean;
   data: {
      label: string;
      action: () => void;
   };
}
