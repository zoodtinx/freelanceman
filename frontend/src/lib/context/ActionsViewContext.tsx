import { useContext, createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface DialogState {
   isOpen: boolean;
   id: string;
   mode: 'view' | 'new'
}

interface ActionsViewContextType {
   isTaskDialogOpen: DialogState;
   setIsTaskDialogOpen: Dispatch<SetStateAction<DialogState>>;
   isNewTaskDialogOpen: DialogState;
   setIsNewTaskDialogOpen: Dispatch<SetStateAction<DialogState>>;
   isEventDialogOpen: DialogState;
   setIsEventDialogOpen: Dispatch<SetStateAction<DialogState>>;
   isNewEventDialogOpen: DialogState;
   setIsNewEventDialogOpen: Dispatch<SetStateAction<DialogState>>;
}

const useActionsView = () => {
   const [isTaskDialogOpen, setIsTaskDialogOpen] = useState({
      isOpen: false,
      id: '',
      mode: 'view'
   });

   const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState({
      isOpen: false,
      id: '',
      mode: 'new'
   });

   const [isEventDialogOpen, setIsEventDialogOpen] = useState({
      isOpen: false,
      id: '',
      mode: 'view'
   });
   
   const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState({
      isOpen: false,
      id: '',
      mode: 'new'
   });   

   return {
      isTaskDialogOpen,
      setIsTaskDialogOpen,
      isNewTaskDialogOpen,
      setIsNewTaskDialogOpen,
      isEventDialogOpen,
      setIsEventDialogOpen,
      isNewEventDialogOpen,
      setIsNewEventDialogOpen,
   };
};


const ActionsViewContext = createContext<ActionsViewContextType | undefined>(undefined);

export const ActionsViewProvider = ({ children }: { children: React.ReactNode }) => {
   const {
      isTaskDialogOpen,
      setIsTaskDialogOpen,
      isNewTaskDialogOpen,
      setIsNewTaskDialogOpen,
      isEventDialogOpen,
      setIsEventDialogOpen,
      isNewEventDialogOpen,
      setIsNewEventDialogOpen,
   } = useActionsView();

   return (
      <ActionsViewContext.Provider
         value={{
            isTaskDialogOpen,
            setIsTaskDialogOpen,
            isNewTaskDialogOpen,
            setIsNewTaskDialogOpen,
            isEventDialogOpen,
            setIsEventDialogOpen,
            isNewEventDialogOpen,
            setIsNewEventDialogOpen,
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
