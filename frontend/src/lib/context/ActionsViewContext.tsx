import { useContext, createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import type { DialogState } from '../types/project-view-context.types';
import { ActionFormData, EventStatus, NewEventPayload } from '@types';

interface ActionsViewContextType {
   isTaskDialogOpen: DialogState;
   setIsTaskDialogOpen: Dispatch<SetStateAction<DialogState>>;
   isNewTaskDialogOpen: DialogState;
   setIsNewTaskDialogOpen: Dispatch<SetStateAction<DialogState>>;
   isEventDialogOpen: DialogState;
   setIsEventDialogOpen: Dispatch<SetStateAction<DialogState>>;
   isNewEventDialogOpen: DialogState;
   setIsNewEventDialogOpen: Dispatch<SetStateAction<DialogState>>;
   eventDialogData: NewEventPayload,
   setEventDialogData: Dispatch<SetStateAction<NewEventPayload>>;
   dialogState: DialogState,
   setDialogState: Dispatch<SetStateAction<DialogState>>
}

const useActionsView = () => {
   const [isTaskDialogOpen, setIsTaskDialogOpen] = useState<DialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      actionType: 'task'
   });

   const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState({
      isOpen: false,
      id: '',
      mode: 'new',
   });

   const [isEventDialogOpen, setIsEventDialogOpen] = useState<DialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      actionType: 'event'
   });
   
   const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState({
      isOpen: false,
      id: '',
      mode: 'new'
   });   

const [eventDialogData, setEventDialogData] = useState<NewEventPayload>({
   name: '',
   details: '',
   status: '' as EventStatus,
   dueDate: '',
   projectId: '',
   link: '',
});

const [dialogState, setDialogState] = useState<DialogState>({
   isOpen: false,
   id: '',
   mode: 'view',
   actionType: 'task', 
   data: {
      name: '',
      details: '',
      status: 'planned', 
      link: '',
      dueDate: '',
      projectId: '',
      project: '', 
      client: '', 
      clientId: '', 
   },
});

   return {
      dialogState,
      setDialogState,
      isTaskDialogOpen,
      setIsTaskDialogOpen,
      isNewTaskDialogOpen,
      setIsNewTaskDialogOpen,
      isEventDialogOpen,
      setIsEventDialogOpen,
      isNewEventDialogOpen,
      setIsNewEventDialogOpen,
      eventDialogData,
      setEventDialogData
   };
};


const ActionsViewContext = createContext<ActionsViewContextType | undefined>(undefined);

export const ActionsViewProvider = ({ children }: { children: React.ReactNode }) => {
   const {
      dialogState,
      setDialogState,
      isTaskDialogOpen,
      setIsTaskDialogOpen,
      isNewTaskDialogOpen,
      setIsNewTaskDialogOpen,
      isEventDialogOpen,
      setIsEventDialogOpen,
      isNewEventDialogOpen,
      setIsNewEventDialogOpen,
      eventDialogData,
      setEventDialogData
   } = useActionsView();

   return (
      <ActionsViewContext.Provider
         value={{
            dialogState,
            setDialogState,
            isTaskDialogOpen,
            setIsTaskDialogOpen,
            isNewTaskDialogOpen,
            setIsNewTaskDialogOpen,
            isEventDialogOpen,
            setIsEventDialogOpen,
            isNewEventDialogOpen,
            setIsNewEventDialogOpen,
            eventDialogData,
            setEventDialogData
         }}
      >
         {children}
      </ActionsViewContext.Provider>
   );
};

export const useActionsViewContext = (): ActionsViewContextType => {
   const context = useContext(ActionsViewContext);
   if (!context) {
      throw new Error(
         'useActionsViewContext must be used within an ActionsViewProvider'
      );
   }
   return context;
};
