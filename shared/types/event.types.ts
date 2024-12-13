import type { Task } from "./task.types";

export type EventStatus = 'scheduled' | 'onGoing' | 'completed' | 'cancelled'

export interface NewEventPayload {
   name: string;
   status: EventStatus;
   details: string;
   link: string;
   dueDate: string;
   projectId: string;
}

export interface EventFormData extends NewEventPayload {
   project: string;
   projectId: string;
   client: string;
   clientId: string;
}

export interface Event extends Omit<Task, 'status'> {
  status: EventStatus
}
