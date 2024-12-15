import { DialogState } from "@/lib/context/ProjectViewContextTypes";

export interface DialogProps {
   dialogState: DialogState;
   setDialogState: (newState: DialogState | ((prevState: DialogState) => DialogState)) => void;
}