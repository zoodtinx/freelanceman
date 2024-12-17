import { TaskFormData, EventFormData } from '@types';

export interface TaskEventDialogState {
   isOpen: boolean;
   id: string;
   actionType: 'task' | 'event';
   mode: 'view' | 'create';
   data: TaskFormData | EventFormData;
}

export interface DialogProps<T> {
   dialogState: T;
   setDialogState: (
      newState: T | ((prevState: T) => T)
   ) => void;
}
