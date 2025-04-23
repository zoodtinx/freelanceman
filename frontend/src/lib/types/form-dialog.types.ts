import { CrudApi } from '@/lib/api/api.type';
import { ApiLoadingState } from '@/lib/types/form-element.type';
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
   EditClientDto,
} from 'freelanceman-common';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface ApiLoadingState {
   isLoading: boolean;
   type: 'submit' | 'destructive';
}

export interface FormDialogProps {
   dialogType: string;
   formMethods: UseFormReturn;
   buttonLoadingState: {
      isApiLoading: ApiLoadingState;
      setIsApiLoading: Dispatch<SetStateAction<ApiLoadingState>>;
   };
   crudApi: CrudApi[keyof CrudApi];
   handleLeftButtonClick: (e: any) => void;
}

export interface PromptDialogProps {
   promptDialogState: PromptDialogState;
   setPromptDialogState: Dispatch<SetStateAction<PromptDialogState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export type FormDialogState =
   | {
        isOpen: boolean;
        entity: 'task';
        type: 'task';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: TaskPayload;
     }
   | {
        isOpen: boolean;
        entity: 'event';
        type: 'event';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: EventPayload;
     }
   | {
        isOpen: boolean;
        entity: 'file';
        type: 'file';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: FilePayload;
     }
   | {
        isOpen: boolean;
        entity: 'file';
        type: 'new-file';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: CreateFileDto;
     }
   | {
        isOpen: boolean;
        entity: 'project';
        type: 'project-settings';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: ProjectPayload;
     }
   | {
        isOpen: boolean;
        entity: 'clientContact';
        type: 'client-contact';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: ClientContactPayload;
     }
   | {
        isOpen: boolean;
        entity: 'partnerContact';
        type: 'partner-contact';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: PartnerContactPayload;
     }
   | {
        isOpen: boolean;
        entity: 'client';
        type: 'client-settings';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: ClientContactPayload | EditClientDto;
     }
   | {
        isOpen: boolean;
        entity: 'salesDocument';
        type: 'sales-document-item';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: any;
     }
   | {
        isOpen: boolean;
        entity: 'user';
        type: 'user-profile';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: UserPayload;
     }
   | {
        isOpen: boolean;
        entity: 'project';
        type: 'new-project';
        mode: 'create';
        openedOn: OpenedOnType;
        data: CreateProjectDto;
     }
   | {
        isOpen: boolean;
        entity: 'client';
        type: 'new-client';
        mode: 'create';
        openedOn: OpenedOnType;
        data: ClientPayload;
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
