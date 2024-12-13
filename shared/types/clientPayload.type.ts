import type { TaskStatus, EventStatus, Contact } from "./project.types";
import { Task } from "./task.types";

export interface NewProjectPayload {
   client: string;
   clientId: string;
   name: string;
   tasks: Task[];
   events: Event[];
   files: File[];
   brief: string;
   documents: Document[];
   contact: Contact[];
   projectStatus: 'active' | 'onHold' | 'completed';
   paymentStatus: 'notProcessed' | 'processing' | 'paid',
   accentColor: string,
   dateCreated: string,
   dateModified: string,
}