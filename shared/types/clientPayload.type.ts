import type { TaskStatus, EventStatus } from "./project.types";


export interface NewEventPayload {
   name: string;
   status: EventStatus;
   details: string;
   link: string;
   dueDate: string;
   projectId: string;
}

export interface NewTaskPayload extends Omit<NewEventPayload, 'status'> {
   status: TaskStatus;
}

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