import { DialogState } from "@/lib/context/ProjectViewContextTypes";
import type { Task, Event } from "@types";

export interface DialogProps<T> {
   dialogState: DialogState;
   setDialogState: (newState: DialogState | ((prevState: DialogState) => DialogState)) => void;
   dialogData: T;
}