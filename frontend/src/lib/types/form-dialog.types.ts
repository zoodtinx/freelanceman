import {
   ClientFindManyItem,
   CreateClientContactDto,
   CreateClientDto,
   CreateEventDto,
   CreateFileDto,
   CreatePartnerContactDto,
   CreateProjectDto,
   CreateTaskDto,
   FileFindManyItem,
   ProjectFindManyItem,
   UserFindOneResponse,
} from 'freelanceman-common';
import { UseFormReturn } from 'react-hook-form';

export interface FormDialogProps {
   dialogType: string;
   formMethods: UseFormReturn;
   crudApi: any;
   handleLeftButtonClick: (e: any) => void;
}

export type FormDialogState =
   | {
        isOpen: boolean;
        entity: 'salesDocumentItem';
        type: 'salesDocumentItem';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: any;
     }
   | {
        isOpen: boolean;
        entity: 'task';
        type: 'task';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: CreateTaskDto;
     }
   | {
        isOpen: boolean;
        entity: 'event';
        type: 'event';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: CreateEventDto;
     }
   | {
        isOpen: boolean;
        entity: 'file';
        type: 'file';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: FileFindManyItem;
     }
   | {
        isOpen: boolean;
        entity: 'file';
        type: 'newFile';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: CreateFileDto;
     }
   | {
        isOpen: boolean;
        entity: 'project';
        type: 'projectSettings';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: ProjectFindManyItem;
     }
   | {
        isOpen: boolean;
        entity: 'clientContact';
        type: 'clientContact';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: CreateClientContactDto;
     }
   | {
        isOpen: boolean;
        entity: 'partnerContact';
        type: 'partnerContact';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: CreatePartnerContactDto;
     }
   | {
        isOpen: boolean;
        entity: 'client';
        type: 'clientSettings';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: ClientFindManyItem;
     }
   | {
        isOpen: boolean;
        entity: 'salesDocument';
        type: 'salesDocument';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: any;
     }
   | {
        isOpen: boolean;
        entity: 'user';
        type: 'userProfile';
        mode: 'create' | 'edit';
        openedOn: OpenedOnType;
        data: UserFindOneResponse;
     }
   | {
        isOpen: boolean;
        entity: 'project';
        type: 'newProject';
        mode: 'create';
        openedOn: OpenedOnType;
        data: CreateProjectDto;
     }
   | {
        isOpen: boolean;
        entity: 'client';
        type: 'newClient';
        mode: 'create';
        openedOn: OpenedOnType;
        data: CreateClientDto;
     };

export type FormDialogType =
   | 'task'
   | 'event'
   | 'file'
   | 'newFile'
   | 'projectSettings'
   | 'clientContact'
   | 'clientSettings'
   | 'partnerContact'
   | 'salesDocumentItem'
   | 'salesDocument'
   | 'userProfile'
   | 'newProject'
   | 'newClient';

export type OpenedOnType =
   | 'projectPage'
   | 'allProjectsPage'
   | 'clientPage'
   | 'partnerPage'
   | 'allClientsPage'
   | 'actionPage'
   | 'filePage'
   | 'documentPage'
   | 'globalAddButton'
   | 'incomePage';
