import {
   EventPayload,
   FilePayload,
   TaskPayload,
   CreateFileDto,
   ProjectPayload,
   ClientContactPayload,
   PartnerContactPayload,
   UserPayload,
   CreateProjectDto,
   ClientPayload,
   UpdateClientDto,
 } from 'freelanceman-common'; 
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface FormDialogProps {
   formMethods: UseFormReturn;
   handleEscapeWithChange: () => void;
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
        data: TaskPayload;
     }
   | {
        isOpen: boolean;
        type: 'event';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: EventPayload;
     }
   | {
        isOpen: boolean;
        type: 'file';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: FilePayload;
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
        data: ProjectPayload;
     }
   | {
        isOpen: boolean;
        type: 'client-contact';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: ClientContactPayload;
     }
   | {
        isOpen: boolean;
        type: 'partner-contact';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: PartnerContactPayload;
     }
   | {
        isOpen: boolean;
        type: 'client-settings';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: ClientContactPayload;
     }
   | {
        isOpen: boolean;
        type: 'partner-contact';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: PartnerContactPayload;
     }
   | {
        isOpen: boolean;
        type: 'sales-document-item';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: any;
     }
   | {
        isOpen: boolean;
        type: 'user-profile';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: UserPayload;
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
        data: ClientPayload;
     }
   | {
        isOpen: boolean;
        type: 'client-settings';
        mode: 'edit';
        openedOn: OpenedOnType;
        data: UpdateClientDto;
     }
   | {
        isOpen: boolean;
        type: 'placeholder';
        mode: 'edit';
        openedOn: OpenedOnType;
        data: null;
     };

export type FormDialogType =
   | 'task'
   | 'event'
   | 'file'
   | 'project-settings'
   | 'client-contact'
   | 'client-settings'
   | 'partner-contact'
   | 'sales-document-item'
   | 'user-profile'
   | 'new-project'
   | 'new-client'
   | 'new-file';

export type OpenedOnType =
   | 'project-page'
   | 'all-project-page'
   | 'client-page'
   | 'partner-page'
   | 'all-client-page'
   | 'action-page'
   | 'file-page'
   | 'document-page'
   | 'global-add-button';

export interface PromptDialogState {
   isOpen: boolean;
   data: {
      label: string;
      action: () => void;
   };
}
