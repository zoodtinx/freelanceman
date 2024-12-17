import { DialogState } from "src/lib/types/project-view-context.types";

export interface DialogProps {
   dialogState: DialogState;
   setDialogState: (newState: DialogState | ((prevState: DialogState) => DialogState)) => void;
}