export interface ConfirmationDialogState {
   isOpen: boolean;
   type: 'delete' | 'confirm';
   message: string;
   actions: {
      primary: () => void;
      secondary: () => void;
      tertiaryLeft?: () => void;
      tertiaryRight?: () => void;
   };
}
