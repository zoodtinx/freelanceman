import { TaskFormData, EventFormData } from '@types';
import type { Project, ProjectSettingFormData } from '@types';

export type FormDialogState =
   | {
        isOpen: boolean;
        id: string;
        type: 'task';
        mode: 'view' | 'create';
        data: TaskFormData;
     }
   | {
        isOpen: boolean;
        id: string;
        type: 'event';
        mode: 'view' | 'create';
        data: EventFormData;
     }
   | {
        isOpen: boolean;
        id: string;
        type: 'project';
        mode: 'view' | 'create';
        data: ProjectSettingFormData;
     }
   | {
        isOpen: boolean;
        id: string;
        type: 'file';
        mode: 'view' | 'create';
        data: FileFormData;
     }
   | {
        isOpen: boolean;
        id: string;
        type: 'document';
        mode: 'view' | 'create';
        data: DocumentFormData;
     };

export interface DialogProps {
   dialogState: FormDialogState;
   setDialogState: (
      newState:
         | FormDialogState
         | ((prevState: FormDialogState) => FormDialogState)
   ) => void;
}
